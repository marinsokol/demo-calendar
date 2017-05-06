import { connect } from 'react-redux';
import Calendar from '../components/Calender.component';
import { formatEvents } from '../mappers';

const mapStateToProps = state => ({
  events: formatEvents(state.events),
});

export default connect(
  mapStateToProps,
)(Calendar);
