import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchTasks() {
  try {
    const res = yield call(fetch, 'http://localhost:3001/tasks');
    const data = yield res.json();
    yield put({ type: 'task/loadSuccess', payload: data });
  } catch (e) {
    yield put({ type: 'task/loadFail', error: e.message });
  }
}

function* taskSaga() {
  yield takeEvery('task/fetchTasks', fetchTasks);
}

export default taskSaga;
