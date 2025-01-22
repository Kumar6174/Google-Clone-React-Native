import { all } from 'redux-saga/effects';
import watchFetchNews from './newsSaga';
import watchSearch from './searchSaga';
import watchAutocomplete from './autocompleteSaga';
import { watchTrendingSaga } from './trendingSaga';

export default function* rootSaga() {
  yield all([watchFetchNews(), watchSearch(), watchAutocomplete(), watchTrendingSaga()]);
}



