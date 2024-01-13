import { useSelector } from "react-redux";
import { mdiDelete } from "@mdi/js";
import Icon from "@mdi/react";
import { addToCart, removeCartItem } from "../slicers/cartSlice";
import { useDispatch } from "react-redux";
import store from "../store";
import { Link } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (product) => {
    const newQty = product.quantity + 1;
    if (newQty >= product.stock) return;
    dispatch(
      addToCart({
        product: product.product,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.image,
        quantity: newQty,
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(store.getState().cart.cartItems)
    );
  };
  const decreaseQuantity = (product) => {
    console.log({ product });
    const newQty = product.quantity - 1;
    if (newQty <= 0) return;
    dispatch(
      addToCart({
        product: product.product,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.image,
        quantity: newQty,
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(store.getState().cart.cartItems)
    );
  };
  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
    localStorage.setItem(
      "cartItems",
      JSON.stringify(store.getState().cart.cartItems)
    );
  };
  return (
    <>
      <span className="flex xs:my-5 sm:my-14 ml-10">
        {cartItems.length > 0 ? (
          <>
            <h1 className="xs:text-lg sm:text-4xl text-gray-700 font-semibold">
              Cart:
            </h1>
            <h1 className=" font-bold xs:text-lg sm:text-4xl text-green-900">
              &nbsp;{cartItems.length} Items
            </h1>
          </>
        ) : (
          <h1 className=" font-bold text-4xl text-center">
            Your Cart is Empty
          </h1>
        )}
      </span>

      <div className="flex max-md:flex-col max-md:items-center  justify-around  gap-4 sm:mx-20">
        <div className="basis-3/4 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div key={item.product} className="">
              <hr />
              <div className="flex h-36 justify-between items-start xs:gap-1  ms:gap-2 my-4">
                <img
                  className="basis-1/5 h-32 "
                  src={item.image}
                  alt="product image"
                  height="80"
                  width="114"
                />
                <h3 className="basis-1/5 max-ms:hidden text-gray-800 font-semibold text-md h-full overflow-clip ">
                  {item.name}
                </h3>
                <h3 className="basis-1/5  text-green-900 xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center">
                  $ {item.price}
                </h3>
                <span className="flex justify-between items-center xs:gap-1  ms:gap-2">
                  <button
                    type="button"
                    id="increase"
                    className=" bg-red-600 text-white px-2 py-2 rounded-sm font-semibold"
                    onClick={() => decreaseQuantity(item)}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    type="button"
                    id="increase"
                    className=" bg-blue-800 text-white px-2 py-2 rounded-sm font-semibold"
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>
                </span>
                <span className="basis-1/5  text-red-600 hover:text-red-400">
                  <Icon
                    className=" mt-2 mx-auto cursor-pointer"
                    path={mdiDelete}
                    size={1.1}
                    horizontal
                    vertical
                    rotate={180}
                    onClick={() => removeCartItemHandler(item.product)}
                  />
                </span>
              </div>
              <hr />
            </div>
          ))}
        </div>
        {cartItems.length > 0 && (
          <div className="basis-1/4 flex flex-col   max-w-[250px]">
            <div className="flex flex-col gap-2  p-4 border-2 border-gray-500 rounded-2xl">
              <h3 className=" text-2xl text-gray-700 text-center font-semibold mb-2">
                Order Summary
              </h3>
              <hr />
              <span className="flex justify-between my-2">
                <p>Subtotal:</p>
                <p className="font-semibold">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  (Units)
                </p>
              </span>
              <span className="flex justify-between my-2">
                <p>Est. total:</p>
                <p className="font-semibold">
                  $
                  {cartItems
                    .reduce((sum, item) => sum + item.quantity * item.price, 0)
                    .toFixed(2)}
                </p>
              </span>
              <hr />
              <Link
                to="/shipping"
                className="bg-green-900 text-center hover:bg-gray-200 hover:text-green-900 font-semibold border border-green-900 text-white rounded-full px-4 py-2 my-4"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
