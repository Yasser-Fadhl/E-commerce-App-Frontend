// src/redux/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Define an initial state for the slice
const initialState = {
  loading: true,
  product: {},
  error: null,
};
// Define an async thunk for fetching products from the API
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/products/${id}`
      );
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.Message) {
        console.log(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data.Message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

// Create a slice with reducers and actions
const productDetailsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearErrors: (state) => {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { clearErrors } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
