import { useSelector } from "react-redux";
import { mdiDelete, mdiDeleteSweep } from "@mdi/js";
import Icon from "@mdi/react";
import { addToCart, removeCartItem } from "../slicers/cartSlice";
import { useDispatch } from "react-redux";
import store from "../store";
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
      <span className="flex my-14 ml-10">
        <h1 className=" text-4xl">Your Cart: </h1>
        <h1 className=" font-bold text-4xl"> &nbsp;{cartItems.length} Items</h1>
      </span>

      <div className="flex max-md:flex-col  justify-around  gap-4 mx-20">
        <div className="basis-3/4 flex flex-col gap-6">
          {cartItems.map((item) => (
            <div key={item.product} className="">
              <hr />
              <div className="flex h-36 justify-between items-start gap-2 my-4">
                <img
                  className="basis-1/5 h-32"
                  src={item.image}
                  alt="product image"
                  height="80"
                  width="114"
                />
                <h3 className="basis-1/5 text-gray-800 font-semibold text-md h-full overflow-clip  ">
                  {item.name}
                </h3>
                <h3 className="basis-1/5  text-green-900 xs:text-lg sm:text-xl lg:text-3xl font-semibold text-center">
                  $ {item.price}
                </h3>
                <span className="flex justify-between items-center gap-2">
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
        <div className="basis-1/4 flex flex-col  max-w-[250px]">
          <div className="flex flex-col gap-2  p-4 border-2 border-gray-500 rounded-2xl">
            <h3 className=" text-2xl text-gray-700 text-center font-semibold mb-2">
              Order Summary
            </h3>
            <hr />
            <span className="flex justify-between my-2">
              <p>Subtotal:</p>
              <p>{cartItems.length} (Units)</p>
            </span>
            <span className="flex justify-between my-2">
              <p>Est. total:</p>
              <p>$244</p>
            </span>
            <hr />
            <button
              type="button"
              className="bg-green-900 hover:bg-gray-200 hover:text-green-900 font-semibold border border-green-900 text-white rounded-full px-4 py-2 my-4"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
