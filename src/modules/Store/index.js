import { SET_PRODUCTS, SET_QUOTES } from './storeActionTypes';

export const initialStoreState = {
  list: [],
  quotesList: [],
  amount: 0,
};

const reducer = (state = initialStoreState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return {
        ...state,
        list: action.payload,
        amount: state.amount + action.payload.length,
      };
    }

    case SET_QUOTES: {
      return {
        ...state,
        quotesList: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
