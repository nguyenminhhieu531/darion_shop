import React, { useState } from 'react';
import ApiService from '../service/ApiServices';
import toast from 'react-hot-toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function ChangePasswordPage(props) {
    const [formChangePassword, setFormChangePassword] = useState({
        password_current: "",
        password: "",
        password_confirmation: "",
    })
    const [errors, setErrors] = useState({});

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const [showPassword1, setShowPassword1] = useState(false);
    const togglePasswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    }

    const [showPassword2, setShowPassword2] = useState(false);
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormChangePassword({
            ...formChangePassword,
            [name]: value
        })

        setErrors((prev) => (
            {
                ...prev,
                [name]: "" // Xóa lỗi khi người dùng sửa nội dung
            }
        ));
    }

    const validateForm = () => {
        const { password_current, password, password_confirmation } = formChangePassword;
        const newErrors = {};

        if (!password_current) {
            newErrors.password_current = "Password không được để trống";
        } else if (password_current.length < 6) {
            newErrors.password_current = "Password phải có ít nhất 6 ký tự";
        }

        if (!password) {
            newErrors.password = "Password không được để trống";
        } else if (password.length < 6) {
            newErrors.password = "Password phải có ít nhất 6 ký tự";
        }

        if (!password_confirmation) {
            newErrors.password_confirmation = "Password không được để trống";
        } else if (password_confirmation.length < 6) {
            newErrors.password_confirmation = "Password phải có ít nhất 6 ký tự";
        }

        if (password !== password_confirmation) {
            newErrors.password_confirmation = "Xác nhận mật khẩu chưa khớp!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Không có lỗi => return true
    };


    const handleChangePassword = async () => {
        if (!validateForm()) {
            return
        }
        try {
            const res = await ApiService.changePassword({
                password_current: formChangePassword.password_current,
                password: formChangePassword.password,
                password_confirmation: formChangePassword.password_confirmation,
            });
            console.log(res);
            if (res.status === 200) {
                toast.success("Thay đổi mật khẩu thành công");
            }
        } catch (error) {
            toast.error("Thay đổi mật khẩu thất bại");
            console.log(error);
        }
    }

    return (
        <>
            <section className="">
                <div className="pt-20">
                    <h2 className="text-3xl font-semibold text-center">Change Password</h2>
                    <div className="container">
                        <div className="max-w-xl mx-auto">
                            <div className="mt-5">
                                <div className="mt-3 relative">
                                    <input
                                        name="password_current"
                                        type={showPassword ? "text" : "password"}
                                        className="mt-2 w-full h-[50px] border border-gray px-4 pr-12 rounded-lg text-[14px]"
                                        placeholder="Password current*"
                                        onChange={handleChange}
                                    />
                                    {errors.password_current && <p className="text-red-500 text-sm mt-1">{errors.password_current}</p>}
                                    <button
                                        onClick={togglePasswordVisibility}
                                        type="button"
                                        className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </button>
                                </div>
                                <div className="mt-3 relative">
                                    <input
                                        name="password"
                                        type={showPassword1 ? "text" : "password"}
                                        className="mt-2 w-full h-[50px] border border-gray px-4 pr-12 rounded-lg text-[14px]"
                                        placeholder="Password new*"
                                        onChange={handleChange}
                                    />
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                    <button
                                        onClick={togglePasswordVisibility1}
                                        type="button"
                                        className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10"
                                    >
                                        {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                    </button>
                                </div>
                                <div className="mt-3 relative">
                                    <input
                                        name="password_confirmation"
                                        type={showPassword2 ? "text" : "password"}
                                        className="mt-2 w-full h-[50px] border border-gray px-4 pr-12 rounded-lg text-[14px]"
                                        placeholder="Password Confirmation*"
                                        onChange={handleChange}
                                    />
                                    {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
                                    <button
                                        onClick={togglePasswordVisibility2}
                                        type="button"
                                        className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10"
                                    >
                                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                    </button>
                                </div>
                                <button
                                    onClick={handleChangePassword}
                                    className="w-full mt-5 mb-5 uppercase h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-lg hover:bg-white border hover:border-black hover:text-black transition-all"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-12 pb-12" />
        </>
    );
}

export default ChangePasswordPage;