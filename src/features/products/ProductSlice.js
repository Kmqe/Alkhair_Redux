import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {

})

export const ProductSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
    }
})