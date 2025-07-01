import { call, put, takeEvery, select } from 'redux-saga/effects';
import taskService from '../../services/taskService';
import {
  setUserId,
  loadSuccess,
  loadFail,
  addTask,
  deleteTask,
  editTask
} from '../slices/taskSlice';

function* handleError(error, context) {
  console.error(`Lỗi trong ${context}:`, error);
  if (error.response) {
    switch (error.response.status) {
      case 400:
        yield put(loadFail('Yêu cầu không hợp lệ. Vui lòng kiểm tra dữ liệu đầu vào.'));
        break;
      case 401:
        yield put(loadFail('Không có quyền truy cập. Vui lòng đăng nhập lại.'));
        break;
      case 404:
        yield put(loadFail('Không tìm thấy dữ liệu.'));
        break;
      case 500:
        yield put(loadFail('Lỗi server. Vui lòng thử lại sau.'));
        break;
      default:
        yield put(loadFail('Đã xảy ra lỗi không xác định. Vui lòng thử lại.'));
    }
  } else {
    yield put(loadFail(error.message || 'Lỗi kết nối. Vui lòng kiểm tra mạng.'));
  }
}

function* fetchTasks(action) {
  try {
    const userId = action.payload;
    if (!userId) throw new Error('Thiếu userId khi fetchTasks');

    console.log('Đang lấy danh sách tasks cho userId:', userId);
    const response = yield call(taskService.getByUserId, userId);
    yield put(setUserId(userId));
    yield put(loadSuccess(response.data || []));
  } catch (e) {
    if (e.response?.status === 404) {
      console.log('Không tìm thấy task cho userId:', action.payload);
      yield put(setUserId(action.payload));
      yield put(loadSuccess([])); // Trả về danh sách rỗng thay vì lỗi
    } else {
      yield* handleError(e, 'fetchTasks');
    }
  }
}

function* createTask(action) {
  try {
    const { userId, ...task } = action.payload;
    if (!userId) throw new Error('Thiếu userId khi createTask');

    console.log('Đang tạo task mới:', task);
    const response = yield call(taskService.add, userId, task);

    yield put(addTask(response.data));

    if (response.data?.requiresSync) {
      console.log('Yêu cầu đồng bộ danh sách tasks sau khi tạo');
      yield put({ type: 'task/fetchTasks', payload: userId });
    }
  } catch (e) {
    yield* handleError(e, 'createTask');
  }
}

function* removeTask(action) {
  try {
    const { userId, taskId } = action.payload;
    if (!userId || !taskId) throw new Error('Thiếu userId hoặc taskId khi removeTask');

    console.log('Đang xóa task:', taskId);
    yield call(taskService.delete, userId, taskId);

    yield put(deleteTask(taskId));

    if (action.payload?.forceSync) {
      console.log('Yêu cầu đồng bộ danh sách tasks sau khi xóa');
      yield put({ type: 'task/fetchTasks', payload: userId });
    }
  } catch (e) {
    yield* handleError(e, 'removeTask');
  }
}

function* updateTask(action) {
  try {
    const { id, ...updates } = action.payload;
    const userId = yield select(state => state.user.currentUser.id);
    if (!userId) throw new Error('Thiếu userId trong store');
    if (!id) throw new Error('Thiếu taskId khi updateTask');

    console.log('Đang cập nhật task:', id, updates);
    const response = yield call(taskService.update, userId, id, updates);

    yield put(editTask({ userId, id, ...updates }));

    if (response.data?.requiresSync) {
      console.log('Yêu cầu đồng bộ danh sách tasks sau khi cập nhật');
      yield put({ type: 'task/fetchTasks', payload: userId });
    }
  } catch (e) {
    yield* handleError(e, 'updateTask');
  }
}

export default function* taskSaga() {
  yield takeEvery('task/fetchTasks', fetchTasks);
  yield takeEvery('task/createTask', createTask);
  yield takeEvery('task/removeTask', removeTask);
  yield takeEvery('task/updateTask', updateTask);
}