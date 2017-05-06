import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalenderSlot from './CalendarSlot.component';
import ToolBar from './ToolBar.component';

BigCalendar.momentLocalizer(moment);

const formats = {
  dateFormat: 'dd',
  timeGutterFormat: 'HH:mm',
};

export default class extends PureComponent {
  static displayName = 'Calendar'

  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape()
    ),
    router: PropTypes.shape(),
  }

  state = {
    date: new Date(),
    selectable: true,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  onDateSelect = (date) => {
    const { router } = this.props;
    const dateFormat = moment(date.start).format('YYYY-MM-DDTHH:mm:ss');
    router.replace(`/create/${dateFormat}`);
  }

  onEventSelect = (event) => {
    const { router } = this.props;
    router.replace(`/update/${event.uid}`);
  }

  render() {
    const { date, selectable } = this.state;
    const { events } = this.props;

    return (
      <BigCalendar
        selectable={selectable}
        views={['week']}
        defaultView="week"
        defaultDate={date}
        onSelectSlot={this.onDateSelect}
        onSelectEvent={this.onEventSelect}
        events={events}
        formats={formats}
        popup={selectable}
        components={{
          event: CalenderSlot,
          toolbar: ToolBar,
        }}
      />
    );
  }
}
