import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/register.css';

export default function RegisterForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user.currentUser);

    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

    const rules = {
        isRequired: (value) => value.trim() ? '' : 'Không được để trống',
        minLength: (value, min = 6) => value.length >= min ? '' : `Ít nhất ${min} ký tự`,
        isConfirmed: (value, compareValue) => value === compareValue ? '' : 'Mật khẩu không khớp'
    };

    useEffect(() => {
        const hasErrors = Object.values(errors).some(err => err);
        const allFieldsFilled = Object.values(form).every(val => val.trim());
        const passwordsMatch = form.password === form.confirmPassword;

        setIsSubmitEnabled(allFieldsFilled && passwordsMatch && !hasErrors);
    }, [form, errors]);

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const validateField = (name, value) => {
        let message = '';
        if (name === 'username') message = rules.isRequired(value);
        if (name === 'password') message = rules.minLength(value, 6);
        if (name === 'confirmPassword') message = rules.isConfirmed(value, form.password);

        setErrors(prev => ({ ...prev, [name]: message }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Object.entries(form).forEach(([key, value]) => validateField(key, value));

        if (isSubmitEnabled) {
            dispatch({ type: 'user/register', payload: { username: form.username, password: form.password } });
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <label className="register-form-label">ĐĂNG KÝ</label>

            <div className="register-form-group">
                <label className="register-form-label">Họ và Tên</label>
                <input
                    name="username"
                    placeholder="Họ và Tên"
                    value={form.username}
                    onChange={handleChange}
                />
                <span className="register-error-message">{errors.username}</span>
            </div>

            <div className="register-form-group">
                <label className="register-form-label">Mật khẩu</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={handleChange}
                />
                <span className="register-error-message">{errors.password}</span>
            </div>

            <div className="register-form-group">
                <label className="register-form-label">Nhập lại Mật khẩu</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại Mật khẩu"
                    value={form.confirmPassword}
                    onChange={handleChange}
                />
                <span className="register-error-message">{errors.confirmPassword}</span>
            </div>

            <div className="register-form-group">
                <button type="submit" className="register-btn register-btn-submit" disabled={!isSubmitEnabled}>
                    Đăng ký
                </button>
            </div>
        </form>
    );
}
