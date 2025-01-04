import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[22rem] mx-auto p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition duration-300 ease-in-out relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[18rem] object-cover rounded-lg shadow-md transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute top-4 right-4">
          <HeartIcon product={product} />
        </div>
      </div>

      <div className="p-4 mt-4">
        <Link to={`/product/${product._id}`} className="hover:underline">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-pink-800 transition duration-300 ease-in-out">
            {product.name}
          </h2>
        </Link>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg text-pink-800 font-semibold">
            ${product.price}
          </span>
          <Link
            to={`/product/${product._id}`}
            className="px-6 py-2 text-sm font-semibold text-white bg-pink-800 rounded-full shadow-md hover:bg-pink-600 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
