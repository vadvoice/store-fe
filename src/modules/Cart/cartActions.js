
import {
  ADD_TO_CART,
  REMOTE_FROM_CART,
  CHECKOUT
} from './cartActionTypes';

const addToCart = product => ({
  type: ADD_TO_CART,
  payload: product
});
const removeFromCart = productId => ({
  type: REMOTE_FROM_CART,
  payload: productId
});
const checkout = () => ({
  type: CHECKOUT,
  payload: null
})

export {
  addToCart,
  removeFromCart,
  checkout
};