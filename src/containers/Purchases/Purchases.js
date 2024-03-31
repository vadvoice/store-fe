import React from 'react';
import { connect } from 'react-redux';
import { constants } from '../../config';

import paymentApi from '../../api/paymentApi';
import {
  addToCart,
  removeFromCart,
  checkout,
} from '../../modules/Cart/cartActions';

import iziToast from 'izitoast';
import { Cart } from '../../components';


import './Purchases.scss';

const PurchasesContainer = (props) => {
  const { cartActions, cartProducts } = props;

  const onCheckout = async (values) => {
    try {
      await paymentApi.checkout({
        products: cartProducts.map((p) => p._id),
        amount: cartProducts.reduce((acc, prod) => acc + prod.amount, 0),
        ...values,
      });
      cartActions.checkout();
      iziToast.success({
        message: constants.cart.successCheckout,
      });
    } catch (e) {
      console.error(e);
      iziToast.error(e);
    }
  };

  return (
    <div className="Cart" data-testid="Cart">
      <Cart
        actions={{
          ...cartActions,
          onCheckout,
        }}
        cartProducts={cartProducts}
      />
    </div>
  );
};

const mapStateToProps = ({ cart: { cartProducts }, auth: { user } }) => ({
  cartProducts,
  user,
});

const mapActionsToProps = (dispatch) => {
  return {
    cartActions: {
      removeFromCart: (productId) => {
        dispatch(removeFromCart(productId));
      },
      addToCart: (product) => {
        iziToast.success({
          title: constants.cart.title,
          message: constants.cart.productAdded,
        });
        dispatch(addToCart(product));
      },
      checkout: () => dispatch(checkout()),
    },
  };
};

const Purchases = connect(
  mapStateToProps,
  mapActionsToProps
)(PurchasesContainer);

export { Purchases };
