import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin } from '../store/features/authenSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import ApiService from '../service/ApiServices';

function Login(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Lấy trạng thái đăng nhập từ Redux store
    // const { isLogin } = useSelector(state => state.authenSlice);

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormLogin({
            ...formLogin,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: "" // Xóa lỗi khi người dùng sửa nội dung
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const { email, password } = formLogin;
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = "Email không được để trống";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Email không hợp lệ";
        }

        if (!password) {
            newErrors.password = "Password không được để trống";
        } else if (password.length < 6) {
            newErrors.password = "Password phải có ít nhất 6 ký tự";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Kiểm tra nếu không có lỗi
    };

    const handleLogin = async () => {
        const isValid = validateForm();
        if (!isValid) return;

        try {
            const response = await ApiService.login({
                email: formLogin.email,
                password: formLogin.password,
            });

            const { access_token } = response.data;

            if (access_token) {
                const userName = formLogin.email.split("@")[0]; // Tạo tên người dùng từ email
                localStorage.setItem("userName", userName);
                localStorage.setItem("authToken", access_token); // Lưu token vào localStorage

                // Dispatch action Redux để cập nhật trạng thái login
                dispatch(doLogin({ email: formLogin.email, access_token }));

                toast.success('Đăng nhập thành công');
                navigate("/"); // Chuyển hướng sau khi đăng nhập thành công
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại");
            console.error("Đã có lỗi xảy ra khi đăng nhập:", error);
        }
    };

    return (
        <>
            <section className="">
                <div className="pt-20">
                    <h2 className="text-3xl font-semibold text-center">Login</h2>
                    <div className="container">
                        <div className="max-w-xl mx-auto">
                            <div className="mt-5">
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                        placeholder="Email*"
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>
                                <div className="mt-3 relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        className="mt-2 w-full h-[50px] border border-gray px-4 pr-12 rounded-lg text-[14px]"
                                        placeholder="Password*"
                                        onChange={handleChange}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                    <button
                                        type="button"
                                        className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </button>
                                </div>

                                {/* <Link to={""} href="#none" className="text-xs mt-5 mb-5 block hover:underline">
                                    Forgot password ?
                                </Link> */}
                                <button
                                    onClick={handleLogin}
                                    className="w-full mt-5 mb-5 uppercase h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-lg hover:bg-white border hover:border-black hover:text-black transition-all"
                                >
                                    Submit
                                </button>
                                <div className='text-center mt-2'>
                                    <span className='text-sm'>Bạn chưa có tài khoản?</span>
                                    <Link to="/register" className="text-md mt-5 mb-5 block hover:underline hover-text-blue">
                                        Đăng ký tại đây
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-12 pb-12" />
        </>
    );
}

export default Login;
