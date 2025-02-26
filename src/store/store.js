import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/categorySlice";
import productSlice from "./features/productSlice";
import authenSlice from "./features/authenSlice";
import cartSlice from "./features/cartSlice";
import wishSlice from "./features/wishList"


const reducer = combineReducers({
    categorySlice,
    productSlice,
    authenSlice,
    cartSlice,
    wishSlice
})

const store = configureStore({
    reducer
})

export default store;