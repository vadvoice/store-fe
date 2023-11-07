import { SET_PRODUCTS } from './storeActionTypes';

export const initialStoreState = {
  list: [],
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

    default:
      return state;
  }
};

export default reducer;
