import {
  LOGIN,
  LOGOUT,
  SET_USER
} from './actionTypes';

const login = auth => ({
  type: LOGIN,
  payload: auth
});
const logout = authID => ({
  type: LOGOUT,
  payload: authID
});
const setUser = user => ({
  type: SET_USER,
  payload: user
});

export {
  login,
  logout,
  setUser
};