import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import createMemoryHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';

import bowsReducer from './../shared/string-builder/assets/utilities/bows/bows-reducer';
import stringStrandsReducer from './../shared/string-builder/assets/utilities/string-strands/string-strands-reducer';
import productsReducer from './../shared/accessories/assets/utilities/products/products-reducer';
import buildStringReducer from './../shared/string-builder/assets/utilities/string-configuration/string-configuration-reducer';
import cartReducer from './../shared/site-cart/assets/utilities/cart/cart-reducer';

const sagaMiddleware = createSagaMiddleware();

const reduxMiddlewares = [
  routerMiddleware( createMemoryHistory() ),
  sagaMiddleware
];

export default (initialState) => {
  const store = createStore(
    combineReducers({
      bowsState: bowsReducer,
      stringStrandsState: stringStrandsReducer,
      productsState: productsReducer,
      buildStringState: buildStringReducer,
      cartState: cartReducer,
    }),
    initialState,
    compose( applyMiddleware(...reduxMiddlewares) )
  );

  store.runSaga = sagaMiddleware.run;

  store.close = () => store.dispatch(END);

  return store;
}
