import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import searchReducer from './searchReducer';
import autocompleteReducer from './autocompleteReducer';
import trendingReducer from './trendingReducer';

const rootReducer = combineReducers({
  news: newsReducer,
  search: searchReducer,
  autocomplete: autocompleteReducer,
  trending: trendingReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
