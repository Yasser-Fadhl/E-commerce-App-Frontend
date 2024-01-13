import Navbar from "./components/Navbar";
import {
  Cart,
  ProductDetailsView,
  ProductsView,
  SignInView,
  SignUpView,
  Shipping,
} from "./layouts";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loadUser } from "./slicers/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsView />} />
        <Route path="/product/:id" element={<ProductDetailsView />} />
        <Route path="/signin" element={<SignInView />} />
        <Route path="/signup" element={<SignUpView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
      </Routes>
    </Router>
  );
}

export default App;
