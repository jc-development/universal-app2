import { combineReducers } from 'redux';
import {routerReducer } from 'react-router-redux';

import bowsReducer from './../string-builder/assets/utilities/bows/bows-reducer';
import stringStrandsReducer from './../string-builder/assets/utilities/string-strands/string-strands-reducer';
import productsReducer from './../accessories/assets/utilities/products/products-reducer';
import buildStringReducer from './../string-builder/assets/utilities/string-configuration/string-configuration-reducer';
import cartReducer from './../site-cart/assets/utilities/cart/cart-reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  bowsState: bowsReducer,
  stringStrandsState: stringStrandsReducer,
  productsState: productsReducer,
  buildStringState: buildStringReducer,
  cartState: cartReducer,
});

export default rootReducer;
