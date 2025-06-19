import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/tasks/taskSlice';
import tagReducer from './features/tags/tagSlice';
import createSagaMiddleware from 'redux-saga';
import taskSaga from './features/tasks/taskSaga';
import tagSaga from './features/tags/tagSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    tags: tagReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(taskSaga);
sagaMiddleware.run(tagSaga);
export default store;
