import {
  LOGIN,
  LOGOUT
} from './actionTypes';

const login = auth => ({
  type: LOGIN,
  payload: auth
});
const logout = authID => ({
  type: LOGOUT,
  payload: authID
});

export {
  login,
  logout
};