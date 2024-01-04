import Navbar from "./components/navbar/Navbar";
import ProductsView from "./layouts/ProductsView";
import SignInView from "./layouts/SignInView";
import SignUpView from "./layouts/SignUpView";
import ProductDetailsView from "./layouts/ProductDetailsView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { clearErrors, loadUser } from "./slicers/authSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
      </Routes>
    </Router>
  );
}

export default App;
