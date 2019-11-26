import { put, takeLatest } from 'redux-saga/effects';
import {
  BUILD_PRECONFIG_STRING_REQUESTED, BUILD_PRECONFIG_STRING_SUCCEEDED, BUILD_PRECONFIG_STRING_FAILED,
  SET_STRING_STRAND_1_REQUESTED, SET_STRING_STRAND_1_SUCCEEDED, SET_STRING_STRAND_1_FAILED,
  SET_STRING_STRAND_2_REQUESTED, SET_STRING_STRAND_2_SUCCEEDED, SET_STRING_STRAND_2_FAILED,
  SET_STRING_STRAND_SERVING_REQUESTED, SET_STRING_STRAND_SERVING_SUCCEEDED, SET_STRING_STRAND_SERVING_FAILED, 
  SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_REQUESTED, SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_SUCCEEDED, SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_FAILED,
  RESET_BUILD_REQUESTED, RESET_BUILD_SUCCEEDED, RESET_BUILD_FAILED,
  REPLACE_WHITE_WITH_ANOTHER_COLOR_REQUESTED, REPLACE_WHITE_WITH_ANOTHER_COLOR_SUCCEEDED, REPLACE_WHITE_WITH_ANOTHER_COLOR_FAILED,
  SET_CUSTOMIZATION_LEVEL_REQUESTED, SET_CUSTOMIZATION_LEVEL_SUCCEEDED, SET_CUSTOMIZATION_LEVEL_FAILED,
  SET_PRICING_REQUESTED, SET_PRICING_SUCCEEDED, SET_PRICING_FAILED,
  SET_BOW_TYPE_REQUESTED, SET_BOW_TYPE_SUCCEEDED, SET_BOW_TYPE_FAILED,
  SET_SELECTED_MATERIAL_NAME_REQUESTED, SET_SELECTED_MATERIAL_NAME_SUCCEEDED, SET_SELECTED_MATERIAL_NAME_FAILED
} from './string-configuration-actions';

export function* buildPreconfigString({preconfigString}) {
  // console.log('preconfig saga: ', preconfigString)
  try {
    yield put({
      type: BUILD_PRECONFIG_STRING_SUCCEEDED,
      payload: preconfigString
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: BUILD_PRECONFIG_STRING_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* setStringStrand1({stringStrand1}) {
  // console.log('stringStrand1 saga: ', stringStrand1)
  try {
    yield put({
      type: SET_STRING_STRAND_1_SUCCEEDED,
      payload: stringStrand1
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: SET_STRING_STRAND_1_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* setStringStrand2({stringStrand2}) {
  // console.log('stringStrand2 saga: ', stringStrand2)
  try {
    yield put({
      type: SET_STRING_STRAND_2_SUCCEEDED,
      payload: stringStrand2
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: SET_STRING_STRAND_2_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* setStringStrandServing({stringStrandServing}) {
  // console.log('stringStrandServing saga: ', stringStrandServing)
  try {
    yield put({
      type: SET_STRING_STRAND_SERVING_SUCCEEDED,
      payload: stringStrandServing
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: SET_STRING_STRAND_SERVING_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* selectBuildFromMixedMaterialPreview({buildSelected}) {
  console.log('buildSelected saga: ', buildSelected)
  try {
    yield put({
      type: SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_SUCCEEDED,
      payload: buildSelected
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* resetBuild() {
  try {
    yield put({
      type: RESET_BUILD_SUCCEEDED,
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: RESET_BUILD_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* replaceWhiteWithAnotherColor({updateStringConfig}) {
  console.log('updateStringConfig saga: ', updateStringConfig)
  try {
    yield put({
      type: REPLACE_WHITE_WITH_ANOTHER_COLOR_SUCCEEDED,
      payload: updateStringConfig
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: REPLACE_WHITE_WITH_ANOTHER_COLOR_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* setCustomizationLevel({customizationLevel}) {
  // console.log('customizationLevel saga: ', customizationLevel)
  try {
    yield put({
      type: SET_CUSTOMIZATION_LEVEL_SUCCEEDED,
      payload: customizationLevel
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: SET_CUSTOMIZATION_LEVEL_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* setPricing({pricing}) {
  // console.log('pricing saga: ', pricing)
  try {
    yield put({
      type: SET_PRICING_SUCCEEDED,
      payload: pricing
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: SET_PRICING_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* setBowType({bowType}) {
  // console.log('bowType saga: ', bowType)
  try {
    yield put({
      type: SET_BOW_TYPE_SUCCEEDED,
      payload: bowType
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: SET_BOW_TYPE_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* setSelectedMaterialName({selectedMaterialName}) {
  // console.log('selectedMaterialName saga: ', selectedMaterialName)
  try {
    yield put({
      type: SET_SELECTED_MATERIAL_NAME_SUCCEEDED,
      payload: selectedMaterialName
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: SET_SELECTED_MATERIAL_NAME_FAILED,
      payload: {
        buildStringState: { error }
      }
    });
  }
}

export function* buildPreconfigStringSaga() {
  yield takeLatest(BUILD_PRECONFIG_STRING_REQUESTED, buildPreconfigString);
};

export function* setStringStrand1Saga() {
  yield takeLatest(SET_STRING_STRAND_1_REQUESTED, setStringStrand1);
};

export function* setStringStrand2Saga() {
  yield takeLatest(SET_STRING_STRAND_2_REQUESTED, setStringStrand2);
};

export function* setStringStrandServingSaga() {
  yield takeLatest(SET_STRING_STRAND_SERVING_REQUESTED, setStringStrandServing);
};

export function* selectBuildFromMixedMaterialPreviewSaga() {
  yield takeLatest(SELECT_BUILD_FROM_MIXED_MATERIAL_PREVIEW_REQUESTED, selectBuildFromMixedMaterialPreview);
};

export function* resetBuildSaga() {
  yield takeLatest(RESET_BUILD_REQUESTED, resetBuild);
};

export function* replaceWhiteWithAnotherColorSaga() {
  yield takeLatest(REPLACE_WHITE_WITH_ANOTHER_COLOR_REQUESTED, replaceWhiteWithAnotherColor);
};

export function* setCustomizationLevelSaga() {
  yield takeLatest(SET_CUSTOMIZATION_LEVEL_REQUESTED, setCustomizationLevel);
};

export function* setPricingSaga() {
  yield takeLatest(SET_PRICING_REQUESTED, setPricing);
};

export function* setBowTypeSaga() {
  yield takeLatest(SET_BOW_TYPE_REQUESTED, setBowType);
};

export function* setSelectedMaterialNameSaga() {
  yield takeLatest(SET_SELECTED_MATERIAL_NAME_REQUESTED, setSelectedMaterialName);
};