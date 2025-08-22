import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "smartphones",
    "mobile-accessories",
    "skin-care",
    "sunglasses",
    "tablets",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
];

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, thunkAPI) => {
    try {
        // Fetch data for each category in parallel using Promise.all
        const results = await Promise.all(
            categories.map(async (cat) => {
                const res = await fetch(
                    `https://dummyjson.com/products/category/${cat}`
                );
                const data = await res.json();
                return { category: cat, products: data.products };
            })
        );
        return results;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const ProductSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: true,
        error: "",
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default ProductSlice.reducer;