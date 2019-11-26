import { put, takeLatest } from 'redux-saga/effects';
import {
  ADD_TO_CART_REQUESTED,
  ADD_TO_CART_SUCCEEDED,
  ADD_TO_CART_FAILED,
  REMOVE_FROM_CART_REQUESTED,
  REMOVE_FROM_CART_SUCCEEDED,
  REMOVE_FROM_CART_FAILED,
  ADD_NITRO_BUTTON_INSTALL_REQUESTED,
  ADD_NITRO_BUTTON_INSTALL_SUCCEEDED,
  ADD_NITRO_BUTTON_INSTALL_FAILED,
  ADD_NITRO_XL_BUTTON_INSTALL_REQUESTED,
  ADD_NITRO_XL_BUTTON_INSTALL_SUCCEEDED,
  ADD_NITRO_XL_BUTTON_INSTALL_FAILED,
} from './cart-actions';

export function* addToCart({productConfig}) {
  try {
    yield put({
      type: ADD_TO_CART_SUCCEEDED,
      payload: productConfig
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: ADD_TO_CART_FAILED,
      payload: {
        cartState: { error }
      }
    });
  }
}

export function* removeFromCart({domId}) {
  try {
    yield put({
      type: REMOVE_FROM_CART_SUCCEEDED,
      payload: domId
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: REMOVE_FROM_CART_FAILED,
      payload: {
        cartState: { error }
      }
    });
  }
}

export function* addNitroButtonInstall({boolean}) {
  try {
    yield put({
      type: ADD_NITRO_BUTTON_INSTALL_SUCCEEDED,
      payload: boolean
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: ADD_NITRO_BUTTON_INSTALL_FAILED,
      payload: {
        cartState: { error }
      }
    });
  }
}

export function* addNitroXlButtonInstall({boolean}) {
  try {
    yield put({
      type: ADD_NITRO_XL_BUTTON_INSTALL_SUCCEEDED,
      payload: boolean
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: ADD_NITRO_XL_BUTTON_INSTALL_FAILED,
      payload: {
        cartState: { error }
      }
    });
  }
}

export function* addToCartSaga() {
  yield takeLatest(ADD_TO_CART_REQUESTED, addToCart);
};

export function* removeFromCartSaga() {
  yield takeLatest(REMOVE_FROM_CART_REQUESTED, removeFromCart);
};

export function* addNitroButtonInstallSaga() {
  yield takeLatest(ADD_NITRO_BUTTON_INSTALL_REQUESTED, addNitroButtonInstall);
};

export function* addNitroXlButtonInstallSaga() {
  yield takeLatest(ADD_NITRO_XL_BUTTON_INSTALL_REQUESTED, addNitroXlButtonInstall);
};