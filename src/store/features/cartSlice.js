import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItemsStorage")) || [],
};

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const payload = action.payload;
            const cartItems = state.cartItems;
            const isCheckProduct = cartItems.some((cart) => cart.id === payload.id)
            if (!isCheckProduct) {
                return {
                    ...state,
                    cartItems: [...cartItems, payload],
                };
            } else {
                const updateCartItems = cartItems.map((item) => {
                    if (item.id === payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                });
                return {
                    ...state,
                    cartItems: updateCartItems
                }
            }
        },
        reduceToCart: (state, action) => {
            const payload = action.payload;
            const cartItems = state.cartItems;
            if (payload.quantity > 1) {
                const updateCartItems = cartItems.map((item) => {
                    if (item.id === payload.id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }
                    return item
                })
                return {
                    ...state,
                    cartItems: updateCartItems
                }
            }
            else {
                const updateCartItems = cartItems.filter((item) => item.id !== payload.id)
                return {
                    ...state,
                    cartItems: updateCartItems
                }
            }
        },
        deleteToCart: (state, action) => {
            const payload = action.payload;
            const cartItems = state.cartItems;
            const updateCartItems = cartItems.filter(
                (item) => item.id !== payload
            );
            return {
                ...state,
                cartItems: updateCartItems
            }
        },
        resetCart: (state) => {
            state.cartItems = []; // Reset cart items
        }
    }
})

export const { addToCart, reduceToCart, deleteToCart, resetCart } = cartSlice.actions
export default cartSlice.reducer