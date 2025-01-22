import {
    FETCH_SUGGESTIONS_REQUEST,
    FETCH_SUGGESTIONS_SUCCESS,
    FETCH_SUGGESTIONS_FAILURE,
    FETCH_SUGGESTIONS_CLEAR,

  } from '../actions/autocompleteActions';
  
  const initialState = {
    suggestions: [],
    loading: false,
    error: null,
  };
  
  const autocompleteReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_SUGGESTIONS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_SUGGESTIONS_SUCCESS:
        return { ...state, loading: false, suggestions: action.payload };
      case FETCH_SUGGESTIONS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case FETCH_SUGGESTIONS_CLEAR:
        return { ...state, loading: false, suggestions: action.payload };
      default:
        return state;
    }
  };
  
  export default autocompleteReducer;
  