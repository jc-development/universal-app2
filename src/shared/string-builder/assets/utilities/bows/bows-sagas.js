import { call, put, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import {
  FETCH_BOWS_REQUESTED,
  FETCH_BOWS_SUCCEEDED,
  FETCH_BOWS_FAILED,
  FETCH_BOW_MODELS_REQUESTED,
  FETCH_BOW_MODELS_SUCCEEDED,
  FETCH_BOW_MODELS_FAILED,
} from './bows-actions';

const url = 'https://winners-choice-string-api.herokuapp.com/api/compound_bows'

export const fetchBowsFromAPI = (bowBrand) => fetch(`${url}${bowBrand !== undefined  ? bowBrand : ''}`, {
  method: 'get',
  mode: 'cors',
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
}).then( response => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
});

export function* fetchBows() {
  try {
    const responseFromApi = yield call(fetchBowsFromAPI);
    const bowsArray = responseFromApi.data;
    yield put({
      type: FETCH_BOWS_SUCCEEDED,
      payload: bowsArray
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: FETCH_BOWS_FAILED,
      payload: {
        bowsState: { error }
      }
    });
  }
}

export function* fetchBowModels(payload) {
  const bowBrand = `?brand=${payload.bowBrand}`
  try {
    const responseFromApi = yield call(fetchBowsFromAPI, bowBrand);
    const bowModelsArray = responseFromApi.data;
    yield put({
      type: FETCH_BOW_MODELS_SUCCEEDED,
      payload: bowModelsArray
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: FETCH_BOW_MODELS_FAILED,
      payload: {
        bowsState: { error }
      }
    });
  }
}

export function* fetchBowsSaga() {
  yield takeLatest(FETCH_BOWS_REQUESTED, fetchBows);
};

export function* fetchBowModelsSaga() {
  yield takeLatest(FETCH_BOW_MODELS_REQUESTED, fetchBowModels);
};
