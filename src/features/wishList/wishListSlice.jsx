import { createSlice } from "@reduxjs/toolkit";

const inWishList = JSON.parse(localStorage.getItem("wish_list"));
const initialState = {
  wishList: inWishList ? inWishList : [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,

  reducers: {
    toggleProductInWishList: (state, action) => {
      const { id } = action.payload;
      const isExist = state.wishList.some((item) => item.id === id);
      if (isExist) {
        state.wishList = state.wishList.filter((item) => item.id !== id);
      } else {
        state.wishList.push(action.payload);
      }
      localStorage.setItem("wish_list", JSON.stringify(state.wishList));
    },
  },
});

export const { toggleProductInWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
