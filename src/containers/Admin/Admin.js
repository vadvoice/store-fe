import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routing, NotFound, Loader } from '../../components/Common';
import { ProductEditor, AuthLogin, Orders } from '../../components';
import iziToast from 'izitoast';

import './Admin.scss';

import productApi from '../../api/productApi';
import adminAPi from '../../api/adminApi';
import authApi from '../../api/authApi';
import orderApi from '../../api/orderApi';

const links = [{
   title: 'Products',
   link: '',
   exact: true
}, {
   title: 'Orders',
   link: 'orders'
}, {
   title: 'Stats',
   link: 'stats'
}];

class Admin extends Component {
   state = {
      isDataLoading: false,
      products: [],
      orders: [],
      isAccessAllowed: false
   }
   async componentDidMount() {
      try {
         await adminAPi.isAdmin();
         await this.fetchProducts();
         this.setState({
            isAccessAllowed: true
         })
      } catch (e) {
         this.setState({
            isAccessAllowed: false
         })
      }
   }
   // authorization
   onLogin = async (values) => {
      await authApi.login(values);
      this.setState({
         isAccessAllowed: true
      })
   }

   // orders actions
   fetchActiveOrders = async () => {
      this.setState({
         isDataLoading: true
      })
      const orders = await orderApi.activeOrders();
      this.setState({
         orders,
         isDataLoading: false
      })
   }
   resolveOrder = async (id) => {
      await orderApi.resolve(id);
      await this.fetchActiveOrders();
   }

   // products actions
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
   sendProductData = async (values) => {
      try {
         this.setState({
            isDataLoading: true
         })

         if (!values._id) {
            await productApi.create(values)
         } else {
            await productApi.update(values._id, values)
         }

      } catch (e) {
         console.error(e);
      } finally {
         await this.fetchProducts();
         this.setState({
            isDataLoading: false
         })
      }
   }
   deleteProduct = async (productId) => {
      this.setState({
         isDataLoading: true
      })
      try {
         const removedProduct = await productApi.delete(productId);
         await this.fetchProducts();
         iziToast.success({
            message: `${removedProduct._id} have been removed`
         })
      } finally {
         this.setState({
            isDataLoading: false
         })
      }
   }

   render() {
      const { match: { path } } = this.props;
      const { isDataLoading, products, isAccessAllowed, orders } = this.state;

      if (!isAccessAllowed) {
         return <div className="Admin" data-testid="Admin">
            <Switch>
               <Route exact path={`${path}`} render={props => <AuthLogin {...props} actions={{ submit: this.onLogin }} />} />
               <Route path="*" component={NotFound} />;
            </Switch>
         </div>
      }
      return <div className="Admin" data-testid="Admin">
         {isDataLoading ? <Loader /> : null}
         <Routing path={path} links={links} />
         <Switch>
            <Route exact path={`${path}`} render={props => <ProductEditor
               {...props}
               actions={{ fetchData: this.fetchProducts, sendProductData: this.sendProductData, deleteProduct: this.deleteProduct }}
               products={products}
            />} />
            <Route exact path={`${path}/orders`} render={props => <Orders
               {...props}
               actions={{ fetchData: this.fetchActiveOrders, resolveOrder: this.resolveOrder }}
               orders={orders}
            />} />

            <Route path="*" component={NotFound} />
         </Switch>
      </div>
   }
}

export {
   Admin
};