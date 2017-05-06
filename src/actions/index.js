import { USER, EVENT } from '../constants/actionTypes';

export const addEvents = data => ({
  type: EVENT.addAll,
  payload: data,
});


export const addUser = data => ({
  type: USER.add,
  payload: data,
});
