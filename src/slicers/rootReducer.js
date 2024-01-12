// src/redux/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import productDetailsReducer from "./productDetailsSlice";
import authReducer from "./authSlice";
import cartItemsReducer from "./cartSlice";
const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  productDetails: productDetailsReducer,
  cart: cartItemsReducer,
  // Add other reducers here
});

export default rootReducer;
