import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { SEARCH_REQUEST, searchSuccess, searchFailure } from '../actions/searchActions';
import { GOOGLE_API_KEY, SEARCH_ENGINE_ID } from '../../ApiConstant';


function fetchSearchResults(query: string) {
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;
  return axios.get(url);
}

function* handleSearch(action: any) {
  try {
    const response = yield call(fetchSearchResults, action.payload);
    yield put(searchSuccess(response.data.items || []));
  } catch (error: any) {
    yield put(searchFailure(error.message || 'Failed to fetch search results'));
  }
}

export default function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, handleSearch);
}
