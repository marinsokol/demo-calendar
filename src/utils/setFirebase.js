import store from 'store';
import { database, auth } from 'firebase';

export const login = ({ email, password }) =>
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => store.set('token', res.refreshToken));

export const logout = () =>
  auth()
    .signOut()
    .then(() => store.remove('token'));

export const saveEvent = event =>
  database()
    .ref('/')
    .once('value')
    .then((snapshot) => {
      const events = snapshot.val();
      let flag = false;
      Object.values(events).forEach((single) => {
        if (new Date(event.start) >= new Date(single.start) &&
          new Date(event.start) <= new Date(single.end) &&
          event.uid !== single.uid) {
          flag = true;
          return;
        }
      });

      if (flag) return 'Event exists';

      database()
        .ref(`/${event.uid}`)
        .set({
          ...event,
        });
      return 'Ugradnja spremljena';
    });

export const deleteEvent = event =>
  database()
    .ref(`/${event.uid}`)
    .remove();
