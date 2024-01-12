import ProductCard from "../components/productCard/productCard";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

const ProductsView = () => {
  const { products, status } = useSelector((state) => state.products);
  return (
    <div className="flex flex-col justify-center items-center">
      {status === "l" ? (
        <div className=" mt-64">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-1 mx-7">
            {products &&
              products.map((product, index) => (
                <ProductCard
                  id={product._id}
                  image={product.images[0].url}
                  title={product.name}
                  price={product.price}
                  rating={product.ratings}
                  key={index}
                />
              ))}
          </div>
          <div className="h-20 py-3">
            {products.length === 0 && (
              <div className="  px-auto py-auto">
                <h3>No products found</h3>
              </div>
            )}
            <Pagination />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsView;
