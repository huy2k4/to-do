import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFail } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import '../../assets/css/loginform.css'

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await userService.getAll();
            const user = res.data.find(u => u.username === username && u.password === password);
            localStorage.setItem('user', JSON.stringify(user));
            if (user) {
                dispatch(loginSuccess(user));
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/');
            } else {
                setError('Tài khoản hoặc mật khẩu không đúng');
                dispatch(loginFail('Sai thông tin đăng nhập'));
            }
        } catch (err) {
            console.error(err);
            setError('Lỗi kết nối server');
            dispatch(loginFail('Lỗi kết nối'));
        }
    };

    return (
        <form className="login-form" autoComplete="off" onSubmit={handleLogin}>
            <label className="login-form-label">ĐĂNG NHẬP</label>

            <div className="login-form-group">
                <label className="login-form-label">Tài khoản</label>
                <input
                    autoComplete="new-password"
                    name="username"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="login-form-group">
                <label className="login-form-label">Mật khẩu</label>
                <input
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && <span className="login-error-message">{error}</span>}

            <div className="login-form-group">
                <button type="submit" className="btn login-submit-btn">Đăng nhập</button>
            </div>

            <div className="login-form-footer">
                <span>Bạn chưa có tài khoản? </span>
                <button type="button" className="link-btn" onClick={() => navigate('/register')}>
                    Đăng ký
                </button>
            </div>
        </form>

    );
}
