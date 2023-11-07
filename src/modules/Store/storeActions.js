
import {
  SET_PRODUCTS,
} from './storeActionTypes';

const setProducts = products => ({
  type: SET_PRODUCTS,
  payload: products
});

export {
  setProducts,
};