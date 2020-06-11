import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routing, NotFound } from '../../components/Common';
import { Products } from '../../components';
import { Loader } from '../../components/Common';

import productApi from '../../api/productApi';

import './Home.scss';

const links = [{
  title: 'Store',
  link: '',
  exact: true
}, {
  title: 'Items',
  link: 'items'
}, {
  title: 'Stats',
  link: 'stats'
}];

class Home extends Component {
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
  render() {
    const { match: { path } } = this.props;
    const { isDataLoading, products } = this.state;

    return <div className="Home" data-testid="Home">
      {isDataLoading ? <Loader /> : null}
      <Routing path={path} links={links} />
      <Switch>
        <Route exact path={`${path}`} render={props => <Products {...props} fetchData={this.fetchProducts} products={products} />} />

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  }
}

export {
  Home
};