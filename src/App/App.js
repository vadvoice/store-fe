import React from 'react';
import { connect } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { login, setUser } from '../modules/Auth/authAction';

import feedbackApi from '../api/feedbackApi';
import iziToast from 'izitoast';
import { WithLayout, FullSizeLayout } from '../HOCs';
import { constants } from '../config';

import { NotFound } from '../components/Common';
import { Home, Main, About, Purchases } from '../containers';
import { Admin } from '../containers';

import { Feedback } from '../components';

import './App.scss';

function App() {
  const mode = 'user';
  const onLeaveFeedback = async (data) => {
    await feedbackApi.leaveFeedback(data);
    iziToast.success({
      message: constants.feedback.feedbackSent,
    });
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <FullSizeLayout path="/" navigationMode={mode}>
          <Main />
        </FullSizeLayout>
      ),
    },
    {
      path: '/store',
      element: (
        <WithLayout navigationMode={mode}>
          <Home />
        </WithLayout>
      ),
    },
    {
      path: '/store/cart',
      element: (
        <WithLayout navigationMode={mode}>
          <Purchases />
        </WithLayout>
      ),
    },
    {
      path: '/admin',
      element: (
        <WithLayout>
          <Admin />
        </WithLayout>
      ),
    },
    { path: '/about', element: <About /> },
    {
      path: '*',
      element: (
        <WithLayout>
          <NotFound />
        </WithLayout>
      ),
    },
  ]);

  return (
    <>
      <Feedback actions={{ onLeaveFeedback }} />
      <RouterProvider router={router} />
    </>
  );
}

const mapStateToProps = ({ auth: { profile, user } }) => ({
  profile,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  initAuth: (authData) => dispatch(login(authData)),
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
