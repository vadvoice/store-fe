import React from 'react';
import ReactDOM from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import reduxStore from './modules/store';

import App from './App/App';

import './index.scss';
// notifyer styles
import 'izitoast/dist/css/iziToast.min.css';
import { constants } from './config';

if (document.title) {
  document.title = constants.main.title;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
