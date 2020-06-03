import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routing, NotFound } from '../../components/Common';
import { Store } from '../../components';

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
  render() {
    const { match: { path } } = this.props;
    return <div className="Home" data-testid="Home">
      <Routing path={path} links={links} />
      <Switch>
        <Route exact path={`${path}`} component={Store} />

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  }
}

export {
  Home
};