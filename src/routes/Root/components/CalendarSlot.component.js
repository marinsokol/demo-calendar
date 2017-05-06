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
      <p>Ime i prezime: {event.title}</p>
      <p>Mobitel: {event.phone}</p>
      <p>Vozilo: {event.vehicle}</p>
      <p>Registracija: {event.registration}</p>
      <p>
        Ugradnja:&nbsp;
        <Checkbox
          checked={event.fitting}
          disabled
        />
      </p>
      <p>
        Balansiranje:&nbsp;
        <Checkbox
          checked={event.balance}
          disabled
        />
      </p>
      <p>
        <Button
          onClick={this.handleUpdateEvent}
          style={{ width: '45%', marginTop: '5px', marginRight: '10px' }}
          type="primary"
          ghost
        >
          Uredi
        </Button>
        <Button
          onClick={this.handleDeleteModal}
          style={{ width: '45%', marginTop: '5px' }}
          type="danger"
          ghost
        >
          Izbriši
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
    const { title, event } = this.props;
    const { modal } = this.state;
    const content = this.getPopoverContent();
    let cssClass = '';
    if (event.fitting && event.balance) {
      cssClass = 'both';
    } else if (event.fitting) {
      cssClass = 'fitting';
    } else if (event.balance) {
      cssClass = 'balance';
    }

    return (<div>
      <Popover
        content={content}
        title={title}
      >
        <div className={cssClass}>
          {title}
        </div>
      </Popover>
      <Modal
        title="Izbriši"
        visible={modal}
        onOk={this.handleDeleteEvent}
        onCancel={this.handleCancel}
        okText={messages.delete}
        cancelText={messages.cancle}
      >
        Jeste li sigurni da želite izbrisati?
      </Modal>
    </div>);
  }
}
