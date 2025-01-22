// src/redux/actions/trendingActions.js
export const FETCH_TRENDING_REQUEST = 'FETCH_TRENDING_REQUEST';
export const FETCH_TRENDING_SUCCESS = 'FETCH_TRENDING_SUCCESS';
export const FETCH_TRENDING_FAILURE = 'FETCH_TRENDING_FAILURE';
export const FETCH_TRENDING_CLEAR = 'FETCH_TRENDING_CLEAR';

export const fetchTrendingRequest = () => ({
  type: FETCH_TRENDING_REQUEST,
});

export const fetchTrendingSuccess = (data: any) => ({
  type: FETCH_TRENDING_SUCCESS,
  payload: data,
});

export const fetchTrendingFailure = (error: any) => ({
  type: FETCH_TRENDING_FAILURE,
  payload: error,
});

export const fetchTrendingClear = () => ({
    type: FETCH_TRENDING_CLEAR,
    payload: [],
  });
