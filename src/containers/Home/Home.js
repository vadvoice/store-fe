import React, { useState } from 'react';
import { connect } from 'react-redux';
import { constants } from '../../config';

import productApi from '../../api/productApi';
import {
  addToCart,
  removeFromCart,
  checkout,
} from '../../modules/Cart/cartActions';
import { setProducts } from '../../modules/Store/storeActions';

import iziToast from 'izitoast';
import { Products } from '../../components';
import { Loader } from '../../components/Common';

import productVoteApi from '../../api/productVoteApi';

import './Home.scss';

const HomeContainer = (props) => {
  const [data, setData] = useState({
    isDataLoading: true,
  });

  const { cartActions, cartProducts, storeActions, user, store } = props;
  const { isDataLoading } = data;
  const { list } = store;

  const fetchProducts = async () => {
    if (list.length) {
      setData({
        ...data,
        isDataLoading: false,
      });
      return;
    }
    try {
      const products = await productApi.list();

      setData({
        ...data,
        isDataLoading: false,
      });
      storeActions.setProductsList(products);
    } catch (e) {
      setData({
        ...data,
        isDataLoading: false,
      });
    }
  };

  const makeVote = async (id, data) => {
    productVoteApi.makeVote(id, { ...data, userId: this.props.user.userId });
  };

  return (
    <div className="Home" data-testid="Home">
      {isDataLoading ? <Loader /> : null}

      <Products
        products={list}
        cartProducts={cartProducts}
        user={user}
        actions={{
          fetchData: fetchProducts,
          makeVote: makeVote,
          ...cartActions,
        }}
      />
    </div>
  );
};

const mapStateToProps = ({
  cart: { cartProducts },
  auth: { user },
  store,
}) => ({
  cartProducts,
  user,
  store,
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
    storeActions: {
      setProductsList: (products) => {
        dispatch(setProducts(products));
      },
    },
  };
};

const Home = connect(mapStateToProps, mapActionsToProps)(HomeContainer);

export { Home };
