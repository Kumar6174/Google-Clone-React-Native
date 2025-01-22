import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE,
  } from '../actions/newsActions';
  
  const initialState = {
    loading: false,
    articles: [],
    error: null,
  };
  
  const newsReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_NEWS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_NEWS_SUCCESS:
        return { ...state, loading: false, articles: action.payload };
      case FETCH_NEWS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default newsReducer;
  