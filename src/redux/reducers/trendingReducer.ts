// src/redux/reducers/trendingReducer.js
import {
    FETCH_TRENDING_REQUEST,
    FETCH_TRENDING_SUCCESS,
    FETCH_TRENDING_FAILURE,
    FETCH_TRENDING_CLEAR,
  } from '../actions/trendingActions';
  
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  const trendingReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_TRENDING_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_TRENDING_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case FETCH_TRENDING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case FETCH_TRENDING_CLEAR:
        return {
          ...state,
          loading: false,
          data: action.payload,
        }
      default:
        return state;
    }
  };
  
  export default trendingReducer;
  