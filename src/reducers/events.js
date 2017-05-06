import { EVENT } from '../constants/actionTypes';

export default function (state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case EVENT.addAll:
      return payload;
    case EVENT.add:
      return {
        ...state,
        [payload.uid]: payload,
      };
    case EVENT.update:
      return {
        ...state,
        [payload.uid]: {
          ...state[payload.uid],
          ...payload,
        },
      };
    default:
      return state;
  }
}
