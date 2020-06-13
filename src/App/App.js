import React from 'react';
import { connect } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import { login } from '../modules/Auth/authAction';
import history from '../history';

import { WithLayout, FullSizeLayout } from '../HOCs';

import { NotFound } from '../components/Common';
import { Home, Main } from '../containers';
import { Admin } from '../containers';

import './App.scss';

function App() {
  const mode = 'user';
  return (
    <Router history={history}>
      <Switch>
        <FullSizeLayout exact path="/" navigationMode={mode} component={Main} />
        <WithLayout path="/store" navigationMode={mode} component={Home} />
        <WithLayout path="/admin" navigationMode={mode} component={Admin} />

        {/* not found page */}
        <WithLayout path="*" navigationMode={mode} component={NotFound} />
      </Switch>
    </Router>
  );
}


const mapStateToProps = ({ auth: { profile } }) => ({
  profile
});

const mapDispatchToProps = dispatch => ({
  initAuth: authData => dispatch(login(authData))
});

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)

