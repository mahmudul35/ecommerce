import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Recent from "../components/Recent";
import WhyChooseUs from "../components/WhyChoose";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="container mx-auto px-4 mt-28">
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div>
            <Recent />
          </div>
          <div className="">
            <h1 className="text-3xl text-center font-bold my-10">
              Special Products
            </h1>

            {/* <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link> */}
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/shop"
                className="bg-pink-600 text-slate-300 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <WhyChooseUs />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
