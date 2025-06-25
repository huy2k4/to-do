import { call, put, takeEvery, select } from 'redux-saga/effects';
import taskService from '../../services/taskService';
import {
  setUserId,
  loadSuccess,
  loadFail,
  addTask,
  deleteTask,
  editTask,
} from '../slices/taskSlice';

function* fetchTasks(action) {
  try {
    const userId = action.payload;
    if (!userId) throw new Error('Thiếu userId khi fetchTasks');

    const response = yield call(taskService.getByUserId, userId);
    // console.log('API Response:', response.data);

    yield put(setUserId(userId));    // Set userId vào state
    yield put(loadSuccess(response.data));
  } catch (e) {
    yield put(loadFail(e.message));
  }
}


function* createTask(action) {
  try {
    const { userId, ...task } = action.payload;
    if (!userId) throw new Error('Thiếu userId khi createTask');

    const response = yield call(taskService.add, userId, task);
    yield put(addTask(response.data));
  } catch (e) {
    yield put(loadFail(e.message));
  }
}

// Xoá task
function* removeTask(action) {
  try {
    const { userId, taskId } = action.payload;
    if (!userId || !taskId) throw new Error('Thiếu userId hoặc taskId khi removeTask');

    yield call(taskService.delete, userId, taskId);
    yield put(deleteTask(taskId));
  } catch (e) {
    yield put(loadFail(e.message));
  }
}


function* updateTask(action) {
  try {
    const { id, ...updates } = action.payload;

    const userId = yield select(state => state.user.currentUser.id);
    if (!userId) throw new Error('Thiếu userId trong store');
    if (!id) throw new Error('Thiếu taskId khi updateTask');

    yield call(taskService.update, userId, id, updates);
    yield put(editTask({ userId, id, ...updates }));
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
