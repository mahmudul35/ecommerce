import React from "react";
import SmallProduct from "../pages/Products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";

const Recent = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-bold my-10">
        Recent Added Products
      </h1>
      <div className="grid lg:grid-cols-3 lg:gap-8 md:grid-cols-2 sm:grid-cols-1">
        {data.map((product) => (
          <div key={product._id} className="w-full">
            <SmallProduct product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
