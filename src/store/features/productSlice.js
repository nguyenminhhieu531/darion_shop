import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    bestSeller: [],
    newArrivals: [],
    listProduct: [],
    productSearch: []
};

export const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        BestSeller: (state, action) => {
            return {
                ...state,
                bestSeller: action.payload
            }
        },
        NewArrivals: (state, action) => {
            return {
                ...state,
                newArrivals: action.payload
            }
        },
        ListProduct: (state, action) => {
            return {
                ...state,
                listProduct: action.payload
            }
        },
        ProductSearch: (state, action) => {
            return {
                ...state,
                productSearch: action.payload
            }
        },
    },
})

export const { BestSeller, NewArrivals, ListProduct, ProductSearch } = productSlice.actions
export default productSlice.reducer