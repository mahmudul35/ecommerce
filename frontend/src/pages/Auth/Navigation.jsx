import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left Section - Website Name */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-3xl font-bold text-pink-800 hover:text-pink-600"
          >
            Deshi Mart
          </Link>
        </div>

        {/* Middle Section - Route Links */}
        <div className="flex flex-grow justify-center items-center space-x-6">
          <Link
            to="/"
            className="flex items-center text-pink-800 hover:text-pink-600"
          >
            <AiOutlineHome size={24} />
            <span className="ml-2 hidden md:inline">Home</span>
          </Link>
          <Link
            to="/shop"
            className="flex items-center text-pink-800 hover:text-pink-600"
          >
            <AiOutlineShopping size={24} />
            <span className="ml-2 hidden md:inline">Shop</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center relative text-pink-800 hover:text-pink-600"
          >
            <AiOutlineShoppingCart size={24} />
            <span className="ml-2 hidden md:inline">Cart</span>
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
          <Link
            to="/favorite"
            className="flex items-center text-pink-800 hover:text-pink-600"
          >
            <FaHeart size={20} />
            <span className="ml-2 hidden md:inline">Favorites</span>
            <FavoritesCount />
          </Link>
        </div>

        {/* Right Section - User Info and Logout */}
        <div className="flex items-center space-x-4">
          {userInfo ? (
            <>
              <div className="dropdown">
                <button
                  tabIndex={0}
                  className="text-pink-800 hover:text-pink-600 flex items-center"
                >
                  {userInfo.username}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content bg-white shadow-md rounded-md mt-2 py-2 w-48 text-gray-800"
                >
                  {userInfo.isAdmin && (
                    <>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Category
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Products
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center text-pink-800 hover:text-pink-600"
              >
                <AiOutlineLogin size={24} />
                <span className="ml-2 hidden md:inline">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center text-pink-800 hover:text-pink-600"
              >
                <AiOutlineUserAdd size={24} />
                <span className="ml-2 hidden md:inline">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
