import React from 'react';
import { connect } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import { login } from '../modules/Auth/authAction';
import history from '../history';

import { WithLayout } from '../HOCs';

import { NotFound } from '../components/Common';
import { Home } from '../containers';

import './App.scss';

function App() {
  const mode = 'user';
  return (
    <Router history={history}>
      <Switch>
        <WithLayout path="/" navigationMode={mode} component={Home} />

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

