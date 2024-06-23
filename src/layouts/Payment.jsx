import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const Payment = () => {
  const dispatch = useDispatch();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const stripe = useStripe();
  const elements = useElements();
  const options = {
    style: {
      base: {
        fontSize: "16px",
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };
  return (
    <>
      <div className="w-screen">
        <form
          // method="POST"
          // onSubmit={changeOnClick}
          encType="multipart/form-data"
          className="flex flex-col gap-2 xs:w-full ms:w-10/12 sm:w-1/2 xl:w-1/3  justify-center items-center mx-auto mt-32 border-2  shadow-2xl rounded-lg py-8"
        >
          <h1 className="flex items-center text-green-900 xs:text-2xl ms:text-4xl font-extrabold">
            {/* <FaUser className="mr-2" /> */}
            Card Info
          </h1>
          <div className="w-10/12 flex flex-col border-0 justify-between gap-2 ">
            <div className="flex flex-col">
              <label htmlFor="card_num"> Card Number</label>
              <CardNumberElement
                type="text"
                className=" h-10 text-green-900 p-2 border-green-900 border-2 rounded-lg placeholder:text-gray-700 placeholder:text-opacity-75"
                id="card_num"
                options={options}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="card_expiry"> Card Expiry</label>
              <CardExpiryElement
                type="text"
                className=" h-10 text-green-900 p-2 border-green-900 border-2 rounded-lg placeholder:text-gray-700 placeholder:text-opacity-75"
                id="card_expiry"
                options={options}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="card_cvc"> Card CVC</label>
              <CardCvcElement
                type="text"
                className="h-10 text-green-900 p-2 border-green-900 border-2 rounded-lg placeholder:text-gray-700 placeholder:text-opacity-75"
                id="card_cvc"
                options={options}
              />
            </div>
          </div>
          <div className="w-10/12 mt-2">
            <button
              type="button"
              className="flex w-full justify-center xs:text-sm md:text-lg  items-center text-white  truncate  bg-green-900 hover:bg-white border-green-900 border-2 hover:border-green-900 hover:text-green-900 rounded-md p-2"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
