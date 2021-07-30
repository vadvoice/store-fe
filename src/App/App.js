import React from 'react';
import { connect } from 'react-redux';
import { Switch, Router } from 'react-router-dom';
import { login, setUser } from '../modules/Auth/authAction';
import history from '../history';

import feedbackApi from '../api/feedbackApi';
import iziToast from 'izitoast';
import { WithLayout, FullSizeLayout } from '../HOCs';
import { constants } from '../config';

import { NotFound } from '../components/Common';
import { Home, Main, About } from '../containers';
import { Admin } from '../containers';

import { Feedback } from '../components';

import './App.scss';

function App(props) {
  const mode = 'user';
  const onLeaveFeedback = async (data) => {
    await feedbackApi.leaveFeedback(data);
    iziToast.success({
      message: constants.feedback.feedbackSent
    });
  }

  return (
    <Router history={history}>
      <Feedback actions={{ onLeaveFeedback }} />
      <Switch>
        <FullSizeLayout exact path="/" navigationMode={mode} component={Main} />
        <WithLayout path="/store" navigationMode={mode} component={Home} />
        <WithLayout path="/admin" navigationMode={mode} component={Admin} />
        <FullSizeLayout path="/about" navigationMode={mode} component={About} />

        {/* not found page */}
        <WithLayout path="*" navigationMode={mode} component={NotFound} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = ({ auth: { profile, user } }) => ({
  profile,
  user
});

const mapDispatchToProps = dispatch => ({
  initAuth: authData => dispatch(login(authData)),
  setUser: user => dispatch(setUser(user))
});

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)

