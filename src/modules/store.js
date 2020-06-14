import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger';
import authReducer from './Auth';
import cartReducer from './Cart';

export const configureStore = (initialState) => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      cart: cartReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    initialState,
    applyMiddleware(logger),
  );
  return store;
}

export default configureStore(window.REDUX_INITIAL_DATA);
