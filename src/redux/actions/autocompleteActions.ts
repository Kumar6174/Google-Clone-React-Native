export const FETCH_SUGGESTIONS_REQUEST = 'FETCH_SUGGESTIONS_REQUEST';
export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';
export const FETCH_SUGGESTIONS_FAILURE = 'FETCH_SUGGESTIONS_FAILURE';
export const FETCH_SUGGESTIONS_CLEAR = 'FETCH_SUGGESTIONS_CLEAR';

// Action Creators
export const fetchSuggestionsRequest = (query: string) => ({
  type: FETCH_SUGGESTIONS_REQUEST,
  payload: query,
});

export const fetchSuggestionsSuccess = (suggestions: string[]) => ({
  type: FETCH_SUGGESTIONS_SUCCESS,
  payload: suggestions,
});

export const fetchSuggestionsFailure = (error: string) => ({
  type: FETCH_SUGGESTIONS_FAILURE,
  payload: error,
});

export const fetchSuggestionsClear = () => ({
    type: FETCH_SUGGESTIONS_CLEAR,
    payload: [],
  });
