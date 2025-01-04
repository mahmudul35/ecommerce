import moment from "moment";
import { useState } from "react";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productApiSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import HeartIcon from "./HeartIcon";
import ProductTabs from "./ProductTabs";
import Ratings from "./Ratings";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <div className="p-4">
        <Link
          to="/"
          className="text-pink-600 font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="bg-white shadow-xl rounded-lg p-8 mt-6 mb-10 mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center">
            <div className="w-full sm:w-1/2 lg:w-1/3 pr-6">
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg shadow-lg"
                />
                <HeartIcon product={product} />
              </div>
            </div>

            <div className="w-full sm:w-1/2 lg:w-2/3">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4 text-lg">
                {product.description}
              </p>
              <p className="text-4xl font-extrabold text-pink-600 my-4">
                ${product.price}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="flex items-center text-gray-700 mb-2">
                    <FaStore className="mr-2 text-pink-600" /> Brand:{" "}
                    {product.brand}
                  </h3>
                  <h3 className="flex items-center text-gray-700 mb-2">
                    <FaClock className="mr-2 text-pink-600" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h3>
                  <h3 className="flex items-center text-gray-700 mb-2">
                    <FaStar className="mr-2 text-pink-600" /> Reviews:{" "}
                    {product.numReviews}
                  </h3>
                </div>

                <div>
                  <h3 className="flex items-center text-gray-700 mb-2">
                    <FaStar className="mr-2 text-pink-600" /> Ratings: {rating}
                  </h3>
                  <h3 className="flex items-center text-gray-700 mb-2">
                    <FaShoppingCart className="mr-2 text-pink-600" /> Quantity:{" "}
                    {product.quantity}
                  </h3>
                  <h3 className="flex items-center text-gray-700 mb-2">
                    <FaBox className="mr-2 text-pink-600" /> In Stock:{" "}
                    {product.countInStock}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-pink-500 transition duration-300"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
