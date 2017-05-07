import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import uid from 'uid';
import {
  Modal,
  Row,
  Col,
  Input,
  TimePicker,
  notification,
} from 'antd';
import { saveEvent } from '../../../utils/setFirebase';
import { messages } from '../../../constants/messages';

const format = 'HH:mm';

export default class extends PureComponent {
  static displayName = 'CreateEvent'

  static propTypes = {
    router: PropTypes.shape(),
    params: PropTypes.shape(),
  }

  state = {
    visible: true,
    start: moment(new Date(this.props.params.date)),
    end: moment(new Date(this.props.params.date)).set('minute', moment(new Date(this.props.params.date)).get('minute') + 30),
    title: '',
    description: '',
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleCancle = () => {
    const { router } = this.props;
    router.replace('/');
  }

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
      uid: uid(),
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

  handleInput = e => this.setState({
    [e.target.name]: e.target.value,
  })

  handleStartTime = time =>
    this.setState({
      start: time,
      end: time,
    })

  handleEndTime = time => this.setState({ end: time })

  render() {
    const { title, description, start, end } = this.state;

    return (<Modal
      title={messages.newEvent}
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
