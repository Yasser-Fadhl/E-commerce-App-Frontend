import Navbar from "./components/Navbar";
import {
  Cart,
  ProductDetailsView,
  ProductsView,
  SignInView,
  SignUpView,
  Shipping,
  ConfirmOrder,
  Payment,
} from "./layouts";
import PrivateRoute from "./routes/PrivateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loadUser } from "./slicers/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API } from "./Constants";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    dispatch(loadUser());
    async function getStripeApiKey() {
      const { data } = await axios.get(API + "/stripeapikey", {
        withCredentials: true,
      });
      setStripeApiKey(data.stripe_api_key);
      console.log(stripeApiKey);
    }
    getStripeApiKey();
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
        <Route path="/" element={<PrivateRoute />} exact>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route path="/order/confirm" element={<ConfirmOrder />} />

        <Route path="/" element={<PrivateRoute />} exact>
          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}
          {/* <Elements stripe={loadStripe(stripeApiKey)}>
            <Route path="/payment" element={<Payment />} />
          </Elements> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
