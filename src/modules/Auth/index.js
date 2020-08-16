import Types from './actionTypes';

export const initialAuthState = {
  items: [],
  profile: {},
  user: {}
};

const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case Types.LOGIN: {
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return {
        ...state,
        auth: action.payload
      };
    }
    case Types.LOGOUT: {
      localStorage.removeItem('auth');
      return {
        ...state,
        auth: action.payload
      };
    }
    case Types.SET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }

};

export default reducer;