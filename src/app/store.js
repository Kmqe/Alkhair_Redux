import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishListReducer from "../features/wishList/wishListSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
    }
})