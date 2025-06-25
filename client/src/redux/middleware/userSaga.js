import { call, put, takeEvery } from 'redux-saga/effects';
import userService from '../../services/userService';
import { loginSuccess, loginFail } from '../slices/userSlice';

function* registerSaga(action) {
    try {
        const { username, password } = action.payload;
        const res = yield call(userService.create, { username, password });

        yield put(loginSuccess(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
        yield put(loginFail('Đăng ký thất bại'));
    }
}

function* loginSaga(action) {
    try {
        const { username, password } = action.payload;
        const user = yield call(userService.login, username, password);
        console.log('Kết quả login:', user);
        if (user) {
            yield put(loginSuccess(user));
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            yield put(loginFail('Sai tài khoản hoặc mật khẩu'));
        }
    } catch (err) {
        yield put(loginFail('Đăng nhập thất bại'));
    }
}

export default function* userSaga() {
    yield takeEvery('user/register', registerSaga);
    yield takeEvery('user/login', loginSaga);
}
