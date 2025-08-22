import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import wishListReducer from "../features/wishList/wishListSlice"
import ProductReducer from "../features/products/ProductSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
        products: ProductReducer,
    }
})