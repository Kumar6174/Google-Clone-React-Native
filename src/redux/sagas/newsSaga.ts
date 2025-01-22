import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_NEWS_REQUEST,
  fetchNewsSuccess,
  fetchNewsFailure,
} from '../actions/newsActions';
import { SERP_API_KEY } from '../../ApiConstant';

const API_URL = `https://serpapi.com/search?engine=google_news&api_key=${SERP_API_KEY}`;

function fetchNewsApi() {
  return axios.get(API_URL);
}

function* fetchNewsSaga() {
  try {
    const response = yield call(fetchNewsApi);
    yield put(fetchNewsSuccess(response.data.news_results));
  } catch (error: any) {
    yield put(fetchNewsFailure(error.message));
  }
}

export default function* watchFetchNews() {
  yield takeLatest(FETCH_NEWS_REQUEST, fetchNewsSaga);
}
