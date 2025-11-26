import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        user: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                if (result.data.message === "Đăng nhập thành công") {
                    navigate('/dashboard');
                } else {
                    setError(result.data.message); // lấy message trực tiếp
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>

                <h2>Đăng Nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='user'><strong>Tên tài khoản:</strong></label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            autoComplete="off"
                            placeholder="Nhập tên tài khoản..."
                            className="form-control rounded-0"
                            value={values.user}
                            onChange={(e) => {
                                setValues({ ...values, user: e.target.value });
                            }}
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Mật khẩu:</strong></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder='Nhập mật khẩu...'
                            className='form-control rounded-0'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                        />
                    </div>

                    <button className='btn btn-success w-100 rounded-0'>Đăng nhập</button>

                    <div className='mb-1'>
                        <input type="checkbox" id="checkbox" name="tick" className="me-2" />
                        <label htmlFor='checkbox'><strong>Bạn có đồng ý điều khoản & điều kiện</strong></label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login