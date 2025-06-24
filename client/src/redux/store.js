import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice'
import tagReducer from './slices/tagSlice';
import createSagaMiddleware from 'redux-saga';
import taskSaga from './middleware/taskSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    user: userReducer,
    tags: tagReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(taskSaga);
export default store;
