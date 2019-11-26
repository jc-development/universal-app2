import { call, put, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import {
  FETCH_STRING_STRANDS_REQUESTED,
  FETCH_STRING_STRANDS_SUCCEEDED,
  FETCH_STRING_STRANDS_FAILED,
} from './string-strands-actions';

const url = 'https://winners-choice-string-api.herokuapp.com/api/string_strands'

export const fetchStringStrandsFromAPI = () => fetch(url, {
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

export function* fetchStringStrands() {
  try {
    const responseFromApi = yield call(fetchStringStrandsFromAPI);
    const stringStrandsArray = responseFromApi.data;
    yield put({
      type: FETCH_STRING_STRANDS_SUCCEEDED,
      payload: stringStrandsArray
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: FETCH_STRING_STRANDS_FAILED,
      payload: {
        stringStrandsState: { error }
      }
    });
  }
}

export function* fetchStringStrandsSaga() {
  yield takeLatest(FETCH_STRING_STRANDS_REQUESTED, fetchStringStrands);
};
