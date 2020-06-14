import {
   ADD_TO_CART,
   REMOTE_FROM_CART,
   CHECKOUT
} from './cartActionTypes';

export const initialCartState = {
  cartProducts: [],
};

const reducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload]
      };
    }
    case REMOTE_FROM_CART: {
      return {
        ...state,
        cartProducts: state.cartProducts.filter(p => p._id !== action.payload)
      };
    }
    case CHECKOUT: {
      return initialCartState
    }
    default:
      return state;
  }

};

export default reducer;