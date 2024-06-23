import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { name } = useSelector((state) => state.auth.user);
  const Summation = (target) => {
    return target
      .reduce((sum, item) => sum + item.quantity * item.price, 0)
      .toFixed(2);
  };
  return (
    <>
      <div className="flex justify-around gap-10 xs:p-5 ms:p-10  md:p-20 max-md:flex-col max-md:items-center  ">
        <div className="basis-2/3 flex flex-col justify-center gap-3 mt-20">
          <div className="">
            <h1 className="Font-bold text-4xl">Shipping Info</h1>
            <span className="flex gap-2 ml-5 text-sm mt-4">
              <p className="font-bold">Name:</p>
              <p>{name}</p>
            </span>
            <span className="flex gap-2 ml-5 text-sm mt-1">
              <p className="font-bold">Phone:</p>
              <p>{shippingInfo.phone}</p>
            </span>
            <span className="flex gap-2 ml-5 text-sm mt-1">
              <p className="font-bold">Address:</p>
              <p>{shippingInfo.address}</p>
            </span>
          </div>
          <h1 className="text-2xl">Your Cart Items</h1>
          <div
            className=" flex flex-col 
          "
          >
            {cartItems.map((item) => (
              <div key={item.product} className="">
                <hr />
                <div className="flex xs:flex-col sm:flex-row xs:h-auto sm:h-12 justify-between items-start xs:gap-1  ms:gap-2 my-2">
                  <img
                    className=" h-10 "
                    src={item.image}
                    alt="product image"
                    height="80"
                    width="114"
                  />
                  <h3 className="  text-gray-800 font-semibold text-sm  overflow-clip ">
                    {item.name}
                  </h3>
                  <span
                    className=" 
                   text-gray-800 font-semibold text-sm  overflow-clip "
                  >
                    {item.quantity}x{item.price} =$
                    {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <hr />
          </div>
        </div>

        <div className="basis-1/4 flex flex-col xs:w-full  md:min-w-[250px] ">
          <div className="flex flex-col   p-4 border-2 border-gray-500 rounded-2xl">
            <h3 className=" text-2xl text-gray-700 text-center font-semibold mb-2">
              Order Summary
            </h3>
            <hr />
            <span className="flex justify-between my-1">
              <p>Subtotal:</p>
              <p className="font-semibold">${Summation(cartItems)}</p>
            </span>
            <span className="flex justify-between my-1">
              <p>Shipping Cost:</p>
              <p className="font-semibold">$5.00</p>
            </span>
            <span className="flex justify-between my-1">
              <p>Tax:</p>
              <p className="font-semibold">17.00%</p>
            </span>
            <hr />
            <span className="flex justify-between my-3">
              <p>Total:</p>
              <p className="font-semibold">
                $
                {(
                  Summation(cartItems) -
                  (Summation(cartItems) * 0.17 + 5)
                ).toFixed(2)}
              </p>
            </span>
            <Link
              to="/payment"
              className="bg-green-900 text-center truncate hover:bg-gray-200 hover:text-green-900 font-semibold border border-green-900 text-white rounded-full px-4 py-2 my-4"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
