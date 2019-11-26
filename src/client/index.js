import { render } from 'react-dom';
import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { loadComponents } from 'loadable-components';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootSagas from '../shared/app/rootSagas';

import bowsReducer from './../shared/string-builder/assets/utilities/bows/bows-reducer';
import stringStrandsReducer from './../shared/string-builder/assets/utilities/string-strands/string-strands-reducer';
import productsReducer from './../shared/accessories/assets/utilities/products/products-reducer';
import buildStringReducer from './../shared/string-builder/assets/utilities/string-configuration/string-configuration-reducer';
import cartReducer from './../shared/site-cart/assets/utilities/cart/cart-reducer';

import ScrollTop from '../shared/app/ScrollTop'

import App from '../shared/app';

import { polyfill } from 'es6-promise'; polyfill();
import "babel-polyfill";

// grab the state from a global variable injected into the server generated HTML
const preloadedState = window.__PRELOADED_STATE__;

const reducer = combineReducers({
  routing: routerReducer,
  bowsState: bowsReducer,
  stringStrandsState: stringStrandsReducer,
  productsState: productsReducer,
  buildStringState: buildStringReducer,
  cartState: cartReducer,
});

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

// garbage collect past state
delete window.__PRELOADED_STATE__;

const store = createStore(
  reducer,
  preloadedState,
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

sagaMiddleware.run(rootSagas);

class Main extends Component {
  render() {
    const isIE11=!!window.navigator.userAgent.match(/(MSIE|Trident)/)

    return (
      <BrowserRouter>
        <ScrollTop>
          <App {...this.props} isIE11={isIE11} />
        </ScrollTop>
      </BrowserRouter>
    );
  }
}

loadComponents().then( () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Main />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
});
