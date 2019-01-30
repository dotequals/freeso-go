import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import App from './App';

import { loadState, saveState } from './localStore';
import indexReducer from './redux/indexReducer';
import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import './index.css';

const persistedState = loadState();
const store = createStore(
  indexReducer,
  persistedState,
  devToolsEnhancer(),
);

store.subscribe(() => {
  // Save the whole store for now
  saveState(store.getState());
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
