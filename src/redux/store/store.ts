import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../reducers/newsReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import searchReducer from '../reducers/searchReducer';
import rootReducer from '../reducers/rootReducer';

// Create Saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, 
      immutableCheck: false, // Disable ImmutableStateInvariantMiddleware
      serializableCheck: false,
    }).concat(sagaMiddleware), // Disable Thunk and add Saga
});

// Run Saga middleware
sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
