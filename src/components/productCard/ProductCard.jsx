import { Link } from "react-router-dom";
import { Rating } from "../../utils/rating";
const ProductCard = ({ id, image, title, price, rating }) => {
  return (
    <div className="flex flex-col justify-around shadow-2xl shadow-black rounded-md px-4 py-6 m-6">
      <img
        src={image}
        alt="image"
        width="500"
        height="600"
        className="w-full h-44"
      />

      <h3 className="xs:text-lg md:text-xl lg:text-2xl font-bold">
        {title.substr(0, 50)}
      </h3>

      <div className="flex justify-center items-center my-2 ">
        {Rating(rating).map((rating) => {
          return rating;
        })}
      </div>

      <h4 className="xs:text-xl md:text-2xl lg:text-3xl font-semibold text-center xs:my-1 sm:my-2">
        $ {price}
      </h4>
      <Link
        to={`product/${id}`}
        className=" text-center bg-green-900 text-white rounded-lg px-4 py-2 xs:my-1 sm:my-3"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
