export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SEARCH_CLEAR = 'SEARCH_CLEAR';

// Action Creators
export const searchRequest = (query: string) => ({
  type: SEARCH_REQUEST,
  payload: query,
});

export const searchSuccess = (results: any[]) => ({
  type: SEARCH_SUCCESS,
  payload: results,
});

export const searchFailure = (error: string) => ({
  type: SEARCH_FAILURE,
  payload: error,
});

export const searchClear = () => ({
  type: SEARCH_CLEAR,
  payload: [],
});

