import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto mt-20">
      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold text-gray-700">
            Your cart is empty
          </h2>
          <Link
            to="/shop"
            className="text-pink-500 mt-4 inline-block underline hover:text-pink-700"
          >
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Shopping Cart
            </h1>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-white shadow rounded-lg p-4"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-lg font-semibold text-pink-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <div className="text-gray-600">{item.brand}</div>
                    <div className="mt-2 text-gray-800 font-bold">
                      $ {item.price}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="w-24">
                    <select
                      className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="text-red-500 hover:text-red-700 ml-4"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Cart Summary
            </h2>
            <div className="flex justify-between text-lg text-gray-600 mb-2">
              <span>Total Items:</span>
              <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
              <span>Total Price:</span>
              <span>
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <button
              className="bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg w-full hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
