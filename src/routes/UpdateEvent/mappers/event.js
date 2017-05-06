import moment from 'moment';

/**
 *
 * @param {*object} event
 *
 * Formats start and end time of event from Date to moment object
 */
export const formatEventTime = event => ({
  ...event,
  start: moment(new Date(event.start)),
  end: moment(new Date(event.end)),
});
