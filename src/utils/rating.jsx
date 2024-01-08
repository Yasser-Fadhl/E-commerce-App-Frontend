import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Rating = (rating) => {
  rating = Math.ceil(rating);
  let ratings = [];
  for (let i = 0; i < rating; i++) {
    ratings.push(
      <FontAwesomeIcon
        icon={faStar}
        size="lg"
        className="text-yellow-500"
        key={i}
      />
    );
  }
  return ratings;
};
