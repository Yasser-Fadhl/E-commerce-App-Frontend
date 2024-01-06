// src/redux/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import productDetailsReducer from "./productDetailsSlice";
import authReducer from "./authSlice";
const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  productDetails: productDetailsReducer,
  // Add other reducers here
});

export default rootReducer;
