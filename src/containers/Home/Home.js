import React, { Component } from 'react';
import { connect } from 'react-redux';

import { constants } from '../../config';

import { Switch, Route } from 'react-router-dom';
import paymentApi from '../../api/paymentApi';
import productApi from '../../api/productApi';
import { addToCart, removeFromCart, checkout } from '../../modules/Cart/cartActions';

import iziToast from 'izitoast';
import { NotFound } from '../../components/Common';
import { Products, Cart } from '../../components';
import { Loader } from '../../components/Common';

import './Home.scss';

class HomeContainer extends Component {
  state = {
    isDataLoading: false,
    products: []
  }
  fetchProducts = async () => {
    this.setState({
      isDataLoading: true
    })
    const products = await productApi.list();
    this.setState({
      products,
      isDataLoading: false
    })
  }
  onCheckout = async (values) => {
    const { cartProducts, cartActions } = this.props;
    try {
      await paymentApi.checkout({
        products: cartProducts.map(p => p._id),
        amount: cartProducts.reduce((acc, prod) => acc + prod.amount, 0),
        ...values
      });
      cartActions.checkout();
      iziToast.success({
        message:  constants.cart.successCheckout
      })
    } catch(e) {
      console.error(e);
    }
  }
  render() {
    const { match: { path }, cartActions, cartProducts } = this.props;
    const { isDataLoading, products } = this.state;

    return <div className="Home" data-testid="Home">
      {isDataLoading ? <Loader /> : null}
      <Switch>
        <Route
          exact
          path={`${path}`} render={props => <Products
            {...props}
            products={products}
            cartProducts={cartProducts}
            actions={{
              fetchData: this.fetchProducts,
              ...cartActions
            }}
          />}
        />
        <Route
          exact
          path={`${path}/cart`} render={props => <Cart
            {...props}
            actions={{
              ...cartActions,
              onCheckout: this.onCheckout
            }}
            cartProducts={cartProducts}
          />}
        />

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  }
}

const mapStateToProps = ({ cart: { cartProducts } }) => ({
  cartProducts
})

const mapActionsToProps = (dispatch) => {
  return {
    cartActions: {
      removeFromCart: productId => {
        dispatch(removeFromCart(productId))
      },
      addToCart: product => {
        iziToast.success({
          title: constants.cart.title,
          message: constants.cart.productAdded
        })
        dispatch(addToCart(product))
      },
      checkout: () => dispatch(checkout()),
    }
  }
}

const Home = connect(mapStateToProps, mapActionsToProps)(HomeContainer);

export {
  Home
}