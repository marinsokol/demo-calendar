import { connect } from 'react-redux';
import Update from '../components/UpdateEvent.component';
import { formatEventTime } from '../mappers/event';

const getEvent = (events, uid) => {
  if (Object.keys(events).length === 0) return {};

  if (events[uid]) {
    return formatEventTime(events[uid]);
  }

  return {
    [uid]: 'empty',
  };
};

const mapStateToProps = (state, props) => ({
  event: getEvent(state.events, props.params.uid),
});

export default connect(
  mapStateToProps,
)(Update);
