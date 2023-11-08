import { SET_PRODUCTS, SET_QUOTES } from './storeActionTypes';

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

const setQuotes = (list) => ({
  type: SET_QUOTES,
  payload: list,
});

export { setProducts, setQuotes };
