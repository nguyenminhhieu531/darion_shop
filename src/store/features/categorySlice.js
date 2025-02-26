import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    ourCategories: [],
};

export const categorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers: {
        ListCategory: (state, action) => {
            return {
                ...state,
                ourCategories: action.payload
            }
        },
    },
})

export const { ListCategory } = categorySlice.actions
export default categorySlice.reducer