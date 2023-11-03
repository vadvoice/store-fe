import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Routing, Loader } from '../../components/Common';
import {
  ProductEditor,
  AuthLogin,
  Orders,
  Stats,
  Quotes,
} from '../../components';
import iziToast from 'izitoast';

import './Admin.scss';

import productApi from '../../api/productApi';
import adminAPi from '../../api/adminApi';
import authApi from '../../api/authApi';
import orderApi from '../../api/orderApi';
import statsApi from '../../api/statsApi';
import feedbackApi from '../../api/feedbackApi';
import quotesApi from '../../api/quotesApi';

const links = [
  {
    title: 'Products',
    link: '',
    exact: true,
  },
  {
    title: 'Orders',
    link: 'orders',
  },
  {
    title: 'quotes',
    link: 'quotes',
  },
  {
    title: 'Stats',
    link: 'stats',
  },
];

class Admin extends Component {
  state = {
    products: [],
    orders: [],
    stats: [],
    feedbacks: [],
    quotes: [],

    isDataLoading: false,
    isAccessAllowed: false,
  };
  async componentDidMount() {
    try {
      await adminAPi.isAdmin();

      this.setState({
        isAccessAllowed: true,
      });
    } catch (e) {
      this.setState({
        isAccessAllowed: false,
      });
    }
  }
  // authorization
  onLogin = async (values) => {
    try {
      await authApi.login(values);

      this.setState({
        isAccessAllowed: true,
      });
    } catch (e) {
      console.error(e);
    }
  };

  // orders actions
  fetchActiveOrders = async () => {
    this.setState({
      isDataLoading: true,
    });
    const orders = await orderApi.activeOrders();
    this.setState({
      orders,
      isDataLoading: false,
    });
  };

  // order actions
  resolveOrder = async (id) => {
    await orderApi.resolve(id);
    await this.fetchActiveOrders();
  };

  rejectOrder = async (id) => {
    await orderApi.reject(id);
    await this.fetchActiveOrders();
  };

  // products actions
  fetchProducts = async () => {
    this.setState({
      isDataLoading: true,
    });
    const products = await productApi.rawList();
    this.setState({
      products,
      isDataLoading: false,
    });
  };
  sendProductData = async (values) => {
    try {
      this.setState({
        isDataLoading: true,
      });

      if (!values._id) {
        await productApi.create(values);
      } else {
        await productApi.update(values._id, values);
      }
    } catch (e) {
      console.error(e);
    } finally {
      await this.fetchProducts();
      this.setState({
        isDataLoading: false,
      });
    }
  };
  deleteProduct = async (productId) => {
    this.setState({
      isDataLoading: true,
    });
    try {
      const removedProduct = await productApi.delete(productId);
      await this.fetchProducts();
      iziToast.success({
        message: `${removedProduct._id} have been removed`,
      });
    } finally {
      this.setState({
        isDataLoading: false,
      });
    }
  };
  markProduct = async (productId, mark) => {
    this.setState({
      isDataLoading: true,
    });
    try {
      const removedProduct = await productApi.mark(productId, { mark });
      await this.fetchProducts();
      iziToast.success({
        message: `${removedProduct._id} updated`,
      });
    } finally {
      this.setState({
        isDataLoading: false,
      });
    }
  };

  // azure storage API
  onGalleryItemDelete = async (productId, galleryItemId) => {
    this.setState({
      isDataLoading: true,
    });
    try {
      await productApi.deleteGalleryItem(productId, galleryItemId);
      await this.fetchProducts();
      iziToast.success({
        message: `${galleryItemId} gallery item have been removed`,
      });
    } finally {
      this.setState({
        isDataLoading: false,
      });
    }
  };

  // stats
  fetchStats = async () => {
    this.setState({
      isDataLoading: true,
    });
    const stats = await statsApi.stats();
    const feedbacks = await feedbackApi.list();
    this.setState({
      stats,
      feedbacks,
      isDataLoading: false,
    });
  };
  // quotes
  fetchQuotes = async () => {
    this.setState({
      isDataLoading: true,
    });
    const quotes = await quotesApi.list();
    this.setState({
      quotes,
      isDataLoading: false,
    });
  };
  submitQuote = async (data) => {
    if (data._id) {
      await quotesApi.update(data._id, data);
    } else {
      await quotesApi.create(data);
    }
    this.fetchQuotes();
  };
  deleteQuote = async (id) => {
    await quotesApi.delete(id);
    this.fetchQuotes();
  };

  render() {
    const {
      isDataLoading,
      products,
      isAccessAllowed,
      orders,
      stats,
      feedbacks,
      quotes,
    } = this.state;

    if (!isAccessAllowed) {
      return (
        <div className="Admin" data-testid="Admin">
          <Routes>
            <Route
              exact
              path={`/`}
              element={<AuthLogin actions={{ submit: this.onLogin }} />}
            />
          </Routes>
        </div>
      );
    }
    return (
      <div className="Admin" data-testid="Admin">
        {isDataLoading ? <Loader /> : null}
        <Routing links={links} />
        <Routes>
          <Route
            exact
            path={`/`}
            element={
              <ProductEditor
                actions={{
                  fetchData: this.fetchProducts,
                  sendProductData: this.sendProductData,
                  deleteProduct: this.deleteProduct,
                  onGalleryItemDelete: this.onGalleryItemDelete,
                  markProduct: this.markProduct,
                }}
                products={products}
              />
            }
          />
          <Route
            exact
            path={`/orders`}
            element={
              <Orders
                actions={{
                  fetchData: this.fetchActiveOrders,
                  resolveOrder: this.resolveOrder,
                  rejectOrder: this.rejectOrder,
                }}
                orders={orders}
              />
            }
          />
          <Route
            exact
            path={`/quotes`}
            element={
              <Quotes
                actions={{
                  fetchData: this.fetchQuotes,
                  submitQuote: this.submitQuote,
                  deleteQuote: this.deleteQuote,
                }}
                data={{ quotes }}
              />
            }
          />

          <Route
            exact
            path={`/stats`}
            element={
              <Stats
                actions={{ fetchData: this.fetchStats }}
                data={{
                  stats,
                  feedbacks,
                }}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export { Admin };
