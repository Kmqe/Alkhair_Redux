import { createSlice } from "@reduxjs/toolkit";

const foundCart = JSON.parse(localStorage.getItem("cart"));

const calculateSubTotal = (cart) =>
  cart.reduce((total, product) => total + product.price * product.quantity, 0);

const initialState = {
  cart: foundCart ? foundCart : [],
  subTotal: foundCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push({ ...action.payload, quantity: 1 });
      state.subTotal = calculateSubTotal(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      state.subTotal = calculateSubTotal(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (item.id === action.payload.id && item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 };
          }
        }
        return item;
      });
      state.subTotal = calculateSubTotal(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
      state.subTotal = calculateSubTotal(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
