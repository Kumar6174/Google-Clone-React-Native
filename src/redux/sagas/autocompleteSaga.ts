import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_SUGGESTIONS_REQUEST,
  fetchSuggestionsSuccess,
  fetchSuggestionsFailure,
} from '../actions/autocompleteActions';

const fetchAutocompleteAPI = (query: string) => {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`;
  return axios.get(url);
};

function* fetchSuggestions(action: any): any {
  try {
    const response = yield call(fetchAutocompleteAPI, action.payload);
    const suggestions = response.data[1] || [];
    yield put(fetchSuggestionsSuccess(suggestions));
  } catch (error: any) {
    yield put(fetchSuggestionsFailure(error.message || 'Failed to fetch suggestions'));
  }
}

export default function* watchAutocomplete() {
  yield takeLatest(FETCH_SUGGESTIONS_REQUEST, fetchSuggestions);
}
