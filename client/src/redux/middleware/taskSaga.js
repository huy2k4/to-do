// src/redux/features/tasks/taskSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchTasksApi,
  addTaskApi,
  deleteTaskApi,
  updateTaskApi,
} from '../../services/taskService';

import {
  loadSuccess,
  loadFail,
  addTask,
  deleteTask,
  editTask,
} from '../slices/taskSlice';

// GET
function* fetchTasks() {
  try {
    const response = yield call(fetchTasksApi);
    yield put(loadSuccess(response.data));
  } catch (e) {
    yield put(loadFail(e.message));
  }
}

// POST
function* createTask(action) {
  try {
    const response = yield call(addTaskApi, action.payload);
    yield put(addTask(response.data));
  } catch (e) {
    yield put(loadFail(e.message));
  }
}

// DELETE
function* removeTask(action) {
  try {
    yield call(deleteTaskApi, action.payload);
    yield put(deleteTask(action.payload));
  } catch (e) {
    yield put(loadFail(e.message));
  }
}

// PUT
function* updateTask(action) {
  try {
    const { id, ...updates } = action.payload;
    yield call(updateTaskApi, id, updates);
    yield put(editTask(action.payload));
  } catch (e) {
    yield put(loadFail(e.message));
  }
}

export default function* taskSaga() {
  yield takeEvery('task/fetchTasks', fetchTasks);
  yield takeEvery('task/createTask', createTask);
  yield takeEvery('task/removeTask', removeTask);
  yield takeEvery('task/updateTask', updateTask);
}
