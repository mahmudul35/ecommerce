import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Message from "../../components/Message";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ul style={{ margin: 0 }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "12px",
          height: "12px",
          border: "2px solid #FF1493",
          borderRadius: "50%",
          backgroundColor: "transparent",
        }}
      ></div>
    ),
  };

  return (
    <div className="mb-8 bg-white shadow-lg rounded-lg p-4 relative">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings}>
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4">
                {/* Gradient Background for Image */}
                <div className="relative h-[20rem] md:h-[25rem] bg-gradient-to-r from-pink-100 to-pink-200 flex items-center justify-center rounded-lg shadow-md">
                  <img
                    src={image}
                    alt={name}
                    className="w-auto h-full object-contain rounded-lg"
                  />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {name}
                    </h2>
                    <p className="text-pink-600 text-xl font-bold">${price}</p>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {description.substring(0, 150)}...
                  </p>

                  <div className="flex flex-wrap justify-between mt-6 text-sm text-gray-700">
                    <div className="flex flex-col items-start space-y-2">
                      <div className="flex items-center space-x-2">
                        <FaStore className="text-pink-600" />
                        <span>Brand: {brand}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaClock className="text-pink-600" />
                        <span>Added: {moment(createdAt).fromNow()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaStar className="text-pink-600" />
                        <span>Reviews: {numReviews}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start space-y-2">
                      <div className="flex items-center space-x-2">
                        <FaStar className="text-pink-600" />
                        <span>Ratings: {Math.round(rating)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaShoppingCart className="text-pink-600" />
                        <span>Quantity: {quantity}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaBox className="text-pink-600" />
                        <span>In Stock: {countInStock}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
