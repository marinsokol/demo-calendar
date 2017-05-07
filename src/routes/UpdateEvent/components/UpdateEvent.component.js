import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import {
  Row,
  Col,
  Input,
  TimePicker,
  Modal,
  notification,
} from 'antd';
import { saveEvent } from '../../../utils/setFirebase';
import { messages } from '../../../constants/messages';

const format = 'HH:mm';

export default class extends PureComponent {
  static displayName = 'UpdateEvent'

  static propTypes = {
    params: PropTypes.shape(),
    event: PropTypes.shape(),
    router: PropTypes.shape(),
  }

  state = {
    visible: true,
    title: '',
    start: moment(new Date()),
    uid: '',
    description: '',
  }

  componentWillMount() {
    const { event, params } = this.props;
    if (Object.keys(event).length === 1 && event[params.uid] === 'empty') {
      notification.error({
        message: 'Ne postoji ugradnja ili balansiranje',
      });
    } else if (Object.keys(event).length > 0) {
      this.setState({
        ...event,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUpdate(nextProps) {
    const { event, params } = nextProps;
    if (this.props.event.uid && event.uid === this.props.event.uid) return;

    if (Object.keys(event).length === 1 && event[params.uid] === 'empty') {
      notification.error({
        message: messages.emptyEvent,
      });
    } else if (Object.keys(event).length > 0) {
      this.setState({
        ...event,
      });
    }
  }

  handleInput = e => this.setState({
    [e.target.name]: e.target.value,
  })

  handleOk = () => {
    const { start, end, title, description } = this.state;
    if (!title || !description) {
      notification.error({
        message: messages.emptyInputs,
      });
      return;
    }

    const event = {
      ...this.state,
      start: start.format('YYYY-MM-DDTHH:mm:ss'),
      end: end.format('YYYY-MM-DDTHH:mm:ss'),
    };
    delete event.visible;

    saveEvent(event)
      .then((message) => {
        if (message === messages.eventError) {
          notification.error({ message });
        } else {
          notification.info({ message });
          this.handleCancle();
        }
      });
  }

  handleCancle = () => {
    const { router } = this.props;
    router.replace('/');
  }

  handleStartTime = time =>
    this.setState({
      start: time,
      end: time,
    })

  handleEndTime = time => this.setState({ end: time })

  render() {
    const { title, start, end, description } = this.state;

    return (<Modal
      title={messages.updateEvent}
      visible={this.state.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancle}
      okText={messages.save}
      cancelText={messages.cancle}
    >
      <Row>
        <Col span={8} className="text">{messages.date}:</Col>
        <Col span={16}>
          <Input
            disabled={this.state.visible}
            value={start.format('DD-MM-YYYY')}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8} className="text">{messages.time}:</Col>
        <Col span={8}>
          <TimePicker
            value={start}
            onChange={this.handleStartTime}
            format={format}
          />
        </Col>
        <Col span={8} className="time">
          <TimePicker
            value={end}
            onChange={this.handleEndTime}
            format={format}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8} className="text">{messages.fullName}:</Col>
        <Col span={16}>
          <Input
            name="title"
            value={title}
            onChange={this.handleInput}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8} className="text">{messages.desc}:</Col>
        <Col span={16}>
          <Input
            type="textarea"
            rows={4}
            name="description"
            value={description}
            onChange={this.handleInput}
          />
        </Col>
      </Row>
    </Modal>);
  }
}
