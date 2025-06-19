import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchTags() {
  try {
    const res = yield call(fetch, 'http://localhost:3001/tags');
    const data = yield res.json();
    yield put({ type: 'tag/loadSuccess', payload: data });
  } catch (e) {
    yield put({ type: 'tag/loadFail', error: e.message });
  }
}

function* tagSaga() {
  yield takeEvery('tag/fetchTags', fetchTags);
}

export default tagSaga;
