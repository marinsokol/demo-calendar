import { USER } from '../constants/actionTypes';

export default function (state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case USER.add:
      return {
        email: payload.email,
        uid: payload.uid,
        refreshToken: payload.refreshToken,
      };
    default:
      return state;
  }
}
