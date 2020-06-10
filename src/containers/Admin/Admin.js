import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routing, NotFound, Loader } from '../../components/Common';
import { ProductEditor, AuthLogin } from '../../components';

import './Admin.scss';

import productApi from '../../api/productApi';
import adminAPi from '../../api/adminApi';
import authApi from '../../api/authApi';

const links = [{
   title: 'Products',
   link: '',
   exact: true
}, {
   title: 'Stats',
   link: 'stats'
}];

class Admin extends Component {
   state = {
      isDataLoading: true,
      products: [],
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
      await productApi.delete(productId);
      await this.fetchProducts();
      this.setState({
         isDataLoading: false
      })
   }
   onLogin = async (values) => {
      await authApi.login(values);
      this.setState({
         isAccessAllowed: true
      })
   }
   render() {
      const { match: { path } } = this.props;
      const { isDataLoading, products, isAccessAllowed } = this.state;

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

            <Route path="*" component={NotFound} />
         </Switch>
      </div>
   }
}

export {
   Admin
};