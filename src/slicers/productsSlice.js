// src/redux/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// Define an initial state for the slice
const initialState = {
  limit: 1,
  page: 1,
  keyword: "",
  products: [],
  productsCount: 0,
  totalProducts: 0,
  pages: 0,
  pagination: {},
  status: "idle",
  error: null,
};
// Define an async thunk for fetching products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params) => {
    const query = `limit=${params.limit}&page=${params.page}&keyword=${params.keyword}`;
    console.log(query);
    const response = await axios.get(
      `http://localhost:4000/api/v1/products?${query}`
    );
    return response.data;
  }
);

// Create a slice with reducers and actions
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.keyword = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    clearErrors: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
        state.productsCount = action.payload.count;
        state.totalProducts = action.payload.totalCount;
        state.pages = action.payload.pages;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { clearErrors, setSearchTerm, setLimit, setPage } =
  productsSlice.actions;
export default productsSlice.reducer;
