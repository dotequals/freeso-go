import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';

import { loadState, saveState } from './localStore';
import indexReducer from './redux/indexReducer';
import indexSaga from './redux/indexSaga';
import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import './index.css';

const sagaMiddleware = createSagaMiddleware();
const persistedState = loadState();
const store = createStore(
  indexReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

store.subscribe(() => {
  const state = store.getState();
  saveState({
    settings: state.settings,
  });
});

sagaMiddleware.run(indexSaga);

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
