// src/redux/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Define an initial state for the slice
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};
// Define an async thunk for fetching products from the API
// export const addToCart = createAsyncThunk(
//   "products/getProduct",
//   async (id, thunkAPI) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:4000/api/v1/products/${id}`
//       );
//       return data;
//     } catch (error) {
//       console.log(error);
//       if (error.response && error.response.data.Message) {
//         console.log(error.response.data);
//         return thunkAPI.rejectWithValue(error.response.data.Message);
//       } else {
//         return thunkAPI.rejectWithValue(error.message);
//       }
//     }
//   }
// );

// Create a slice with reducers and actions
const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExists = state.cartItems.find(
        (i) => i.product === item.product
      );
      console.log({ isItemExists });
      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    },
    removeCartItem: (state, action) => {
      const id = action.payload;
      console.log(id);
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== id),
      };
    },
    clearErrors: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
  // extraReducers: {},
});
export const { clearErrors, addToCart, removeCartItem } =
  cartItemsSlice.actions;
export default cartItemsSlice.reducer;
