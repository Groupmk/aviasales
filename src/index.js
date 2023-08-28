import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';

import './index.scss';
import App from './app/App';
import { store } from './redux/store/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
