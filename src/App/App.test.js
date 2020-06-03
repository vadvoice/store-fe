import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import reduxStore from './modules/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

test('Store home page', () => {
  const { getAllByTestId } = render(<BrowserRouter>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </BrowserRouter>);
  const homeContainer = getAllByTestId('Home');
  expect(homeContainer);
});
