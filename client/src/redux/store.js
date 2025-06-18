import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/tasks/taskSlice';
import createSagaMiddleware from 'redux-saga';
import taskSaga from './features/tasks/taskSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(taskSaga);

export default store;
