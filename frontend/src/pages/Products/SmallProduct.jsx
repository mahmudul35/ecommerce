import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-4 p-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[200px] object-cover rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
        <div className="absolute top-3 right-3 z-10">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-800 truncate mb-2 hover:text-pink-800 transition duration-300 ease-in-out">
            {product.name}
          </h2>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-700">${product.price}</span>
          <Link
            to={`/product/${product._id}`}
            className="text-xs font-semibold text-white bg-pink-800 rounded-full px-4 py-1 shadow-lg hover:bg-pink-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
