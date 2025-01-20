// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     userName: "",
//     isLogin:
//         localStorage.getItem("userName") !== null &&
//         localStorage.getItem("userName") !== undefined &&
//         localStorage.getItem("userName") !== ""
// };

// const EMAIL = "nguyenminhhieu2f@gmail.com";
// const PASSWORD = "123456"

// export const authenSlice = createSlice({
//     name: "authenSlice",
//     initialState,
//     reducers: {
//         doLogin: (state, action) => {
//             const { email, password } = action.payload;
//             if (email === EMAIL && password === PASSWORD) {
//                 console.log("Login Thành công");
//                 const userName = email.split("@")[0];
//                 localStorage.setItem("userName", userName)
//                 return {
//                     ...state,
//                     userName,
//                     isLogin: true
//                 }
//             }
//             else {
//                 console.log("Login thất bại");
//                 return {
//                     ...state,
//                     userName: "",
//                     isLogin: false
//                 }
//             }
//         },
//         doLogout: (state) => {
//             localStorage.removeItem("userName");
//             return { ...state, userName: "", isLogin: false };
//         },
//     }
// });

// export const { doLogin, doLogout } = authenSlice.actions;
// export default authenSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    isLogin: localStorage.getItem('userName') !== null && localStorage.getItem('userName') !== undefined && localStorage.getItem('userName') !== '',
};

export const authenSlice = createSlice({
    name: 'authenSlice',
    initialState,
    reducers: {
        // Action khi đăng nhập thành công
        doLogin: (state, action) => {
            const { email, access_token } = action.payload;

            if (access_token) {
                const userName = email.split('@')[0]; // Lấy tên người dùng từ email
                localStorage.setItem('userName', userName);
                localStorage.setItem('authToken', access_token); // Lưu token vào localStorage
                state.userName = userName;
                state.isLogin = true;
            } else {
                state.userName = '';
                state.isLogin = false;
            }
        },

        // Action khi đăng xuất
        doLogout: (state) => {
            localStorage.removeItem('userName');
            localStorage.removeItem('authToken');
            state.userName = '';
            state.isLogin = false;
        },
    },
});

export const { doLogin, doLogout } = authenSlice.actions;
export default authenSlice.reducer;
