import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE, SEARCH_CLEAR } from '../actions/searchActions';

const initialState = {
  results: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_SUCCESS:
      return { ...state, loading: false, results: action.payload };
    case SEARCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SEARCH_CLEAR:
      return { ...state, loading: false, results: action.payload }; 
    default:
      return state;
  }
};

export default searchReducer;
