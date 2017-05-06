import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { initializeApp } from 'firebase';
import config from './config';
import routes from './routes';
import configStore from './store';
import getFirebase from './utils/getFirebase';
import './index.css';

initializeApp(config);

const store = configStore();
getFirebase(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <Router history={browserHistory} routes={routes} />
    </LocaleProvider>
  </Provider>,
  document.getElementById('app')
);
