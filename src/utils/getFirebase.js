import { auth, database } from 'firebase';
import store from 'store';
import { addUser, addEvents } from '../actions';

const getUser = (dispatch) => {
  auth()
    .onAuthStateChanged((user) => {
      if (user) {
        store.set('token', user.refreshToken);
        dispatch(
          addUser(user)
        );
        return;
      }

      store.remove('token');
    });
};

const getEvents = dispatch =>
  database()
    .ref('/')
    .on('value', snapshot =>
      dispatch(
        addEvents((snapshot.val()) ? snapshot.val() : {})
      )
    );


export default (dispatch) => {
  getUser(dispatch);
  getEvents(dispatch);
};
