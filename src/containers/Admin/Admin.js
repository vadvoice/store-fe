import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routing, NotFound, Loader } from '../../components/Common';
import { ProductEditor } from '../../components';

import productApi from '../../api/productApi';

import './Admin.scss';

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
      products: []
   }
   async componentDidMount() {
      await this.fetchProducts();
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
   render() {
      const { match: { path } } = this.props;
      const { isDataLoading, products } = this.state;

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