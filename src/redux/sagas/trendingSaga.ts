// src/redux/sagas/trendingSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_TRENDING_REQUEST,
    fetchTrendingSuccess,
    fetchTrendingFailure,
} from '../actions/trendingActions';
import axios from 'axios';
import { SERP_API_KEY } from '../../ApiConstant';

function fetchTrendingAPI() {
    return axios.get(`https://serpapi.com/search.json?engine=google_trends_trending_now&geo=IN&api_key=${SERP_API_KEY}&limit=10`);
}

function* fetchTrendingSaga() {
    try {
        const response = yield call(fetchTrendingAPI);
        yield put(fetchTrendingSuccess(response.data.trending_searches));
    } catch (error: any) {
        yield put(fetchTrendingFailure(error?.message));
    }
}

export function* watchTrendingSaga() {
    yield takeLatest(FETCH_TRENDING_REQUEST, fetchTrendingSaga);
}

