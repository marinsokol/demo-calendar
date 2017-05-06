/**
 *
 * @param {*object} events
 *
 * Formats start and end time of event from string to Date
 */
export const formatEvents = events =>
  Object.values(events).map(single => ({
    ...single,
    start: new Date(single.start),
    end: new Date(single.end),
  }));
