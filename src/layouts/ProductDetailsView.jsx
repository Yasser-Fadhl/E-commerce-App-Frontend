import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Rating } from "../utils/rating";
import Carousel from "../utils/Carousel";
import { getProduct, clearErrors } from "../slicers/productDetailsSlice";
import { addToCart } from "../slicers/cartSlice";
import Loading from "../components/Loading";
import store from "../store";

const ProductDetailsView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [Quantity, setQuantity] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getProduct(id));
    if (error) {
      alert.error(error);
    }
  }, []);
  const increaseQuantity = () => {
    // console.log({ Quantity });
    if (Quantity >= product.stock) return;
    setQuantity(Quantity + 1);
    // console.log({ Quantity });
  };
  const decreaseQuantity = () => {
    if (Quantity <= 1) return;
    setQuantity(Quantity - 1);
  };
  const AddToCart = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.images[0].url,
        quantity: Quantity,
      })
    );
    alert.success("Item added successfully");

    localStorage.setItem(
      "cartItems",
      JSON.stringify(store.getState().cart.cartItems)
    );
  };
  return (
    <>
      {loading ? (
        <div className=" mt-64">
          <Loading />
        </div>
      ) : (
        <div className="flex xs:flex-col   md:flex-row   justify-around  ">
          <div className="basis-1/2 flex justify-around items-center">
            <Carousel className="w-1/2 h-1/2" images={product.images} />
          </div>
          <div className="basis-1/2 flex flex-col gap-3 justify-around p-4">
            <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
            <p>product # {product._id}</p>
            <hr />
            <div className="flex  items-center my-2 ">
              <span>
                {Rating(product.ratings).map((rating) => {
                  return rating;
                })}
                ({product.numOfReviews} reviews)
              </span>
            </div>
            <hr />
            <h1 className="text-4xl font-semibold ">${product.price}</h1>

            <div className="flex gap-4">
              <span className="flex justify-between items-center gap-2">
                <button
                  type="button"
                  id="increase"
                  className=" bg-red-600 text-white px-2 py-2 rounded-sm font-semibold"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <p>{Quantity}</p>
                <button
                  type="button"
                  id="increase"
                  className=" bg-blue-800 text-white px-2 py-2 rounded-sm font-semibold"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </span>
              <button
                type="button"
                className=" bg-green-900 px-4 py-2 text-white rounded-full"
                disabled={product.stock === 0}
                onClick={AddToCart}
              >
                Add to Cart
              </button>
            </div>
            <span className="flex justify-start">
              <p>Status: </p>
              <p
                className={
                  product.stock > 0
                    ? "text-green-900 font-semibold"
                    : "text-red-900 font-semibold"
                }
              >
                {product.stock > 0 ? " In Stock" : " Out of Stock"}
              </p>
            </span>
            <hr />
            <div className="flex flex-col">
              <h3 className="text-2xl">Desciption:</h3>
              <p className=" text-justify">{product.description}</p>
            </div>
            <hr />
            <span className="flex">
              <p>Sold by: </p>
              <p className=" font-semibold"> {product.seller}</p>
            </span>

            <button
              type="button"
              className=" justify-start sm:w-1/3 md:w-1/2  truncate  bg-green-900 px-4 py-2 text-white rounded-full"
            >
              Submit Your Review
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsView;
