import store from 'store';
import { auth } from 'firebase';
import Root from './Root/components/Root.component';
import Login from './Login/components/Login.component';
import CreateEvent from './CreateEvent/components/CreateEvent.component';
import UpdateEvent from './UpdateEvent/containers/UpdateEvent';

export default [
  {
    path: '/login',
    component: Login,
    onEnter: ({ params }, replace) => {
      if (store.get('token')) {
        replace('/');
      }
    },
  },
  {
    path: '/',
    component: Root,
    onEnter: ({ params }, replace) => {
      if (!store.get('token')) {
        replace('/login');
        return;
      }
      auth()
        .onAuthStateChanged((user) => {
          if (user && user.refreshToken !== store.get('token')) {
            replace('/login');
            return;
          }
          replace('/login');
        });
    },
    childRoutes: [
      {
        path: 'create/:date',
        component: CreateEvent,
      },
      {
        path: 'update/:uid',
        component: UpdateEvent,
      },
    ],
  },
];

