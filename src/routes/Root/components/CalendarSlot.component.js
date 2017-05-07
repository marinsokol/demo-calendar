import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import {
  Popover,
  Button,
  Checkbox,
  Modal,
} from 'antd';
import { deleteEvent } from '../../../utils/setFirebase';
import { messages } from '../../../constants/messages';

export default class extends PureComponent {
  static displayName = 'CalendarSlot'

  static propTypes = {
    title: PropTypes.string,
    event: PropTypes.shape(),
  }

  state = {
    modal: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getPopoverContent = () => {
    const { event } = this.props;

    return (<div>
      <p>{messages.fullName}: {event.title}</p>
      <p>{messages.desc}: {event.description.slice(0, 10)}</p>
      <p>
        <Button
          onClick={this.handleUpdateEvent}
          style={{ width: '45%', marginTop: '5px', marginRight: '10px' }}
          type="primary"
          ghost
        >
          {messages.update}
        </Button>
        <Button
          onClick={this.handleDeleteModal}
          style={{ width: '45%', marginTop: '5px' }}
          type="danger"
          ghost
        >
          {messages.delete}
        </Button>
      </p>
    </div>);
  }

  handleDeleteModal = () => this.setState({ modal: true });

  handleCancel = () => this.setState({ modal: false });

  handleDeleteEvent = () => {
    const { event } = this.props;
    deleteEvent(event);
  }

  handleUpdateEvent = () => {
    const { event } = this.props;
    window.location = `/update/${event.uid}`;
  }

  render() {
    const { title } = this.props;
    const { modal } = this.state;
    const content = this.getPopoverContent();

    return (<div>
      <Popover
        content={content}
        title={title}
      >
        <div>
          {title}
        </div>
      </Popover>
      <Modal
        title={messages.delete}
        visible={modal}
        onOk={this.handleDeleteEvent}
        onCancel={this.handleCancel}
        okText={messages.delete}
        cancelText={messages.cancle}
      >
        {messages.deleteMessage}
      </Modal>
    </div>);
  }
}
