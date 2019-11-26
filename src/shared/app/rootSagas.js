import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { fetchStringStrandsSaga } from './../string-builder/assets/utilities/string-strands/string-strands-sagas'
import { fetchBowsSaga, fetchBowModelsSaga } from './../string-builder/assets/utilities/bows/bows-sagas'
import { fetchProductsSaga } from './../accessories/assets/utilities/products/products-sagas'

import { addToCartSaga, removeFromCartSaga, addNitroButtonInstallSaga, addNitroXlButtonInstallSaga } from './../site-cart/assets/utilities/cart/cart-sagas'

import { 
  buildPreconfigStringSaga,
  setStringStrand1Saga,
  setStringStrand2Saga,
  setStringStrandServingSaga,
  selectBuildFromMixedMaterialPreviewSaga,
  resetBuildSaga,
  replaceWhiteWithAnotherColorSaga,
  setCustomizationLevelSaga,
  setPricingSaga,
  setBowTypeSaga,
  setSelectedMaterialNameSaga,
} from './../string-builder/assets/utilities/string-configuration/string-configuration-sagas'

export default function* rootSaga() {
  yield all([
    fetchStringStrandsSaga(),
    fetchBowsSaga(),
    fetchBowModelsSaga(),
    fetchProductsSaga(),
    addToCartSaga(),
    removeFromCartSaga(),
    addNitroButtonInstallSaga(),
    addNitroXlButtonInstallSaga(),
    buildPreconfigStringSaga(),
    setStringStrand1Saga(),
    setStringStrand2Saga(),
    setStringStrandServingSaga(),
    selectBuildFromMixedMaterialPreviewSaga(),
    resetBuildSaga(),
    replaceWhiteWithAnotherColorSaga(),
    setCustomizationLevelSaga(),
    setPricingSaga(),
    setBowTypeSaga(),
    setSelectedMaterialNameSaga()
  ]);
};
