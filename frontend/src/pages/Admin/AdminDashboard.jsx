import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Loader from "../../components/Loader";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";

const AdminDashboard = () => {
  const { data: sales, isLoading: salesLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: customersLoading } = useGetUsersQuery();
  const { data: orders, isLoading: ordersLoading } = useGetTotalOrdersQuery();
  const { data: salesDetail, isLoading: salesDetailLoading } =
    useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line", // 'line' chart for sales trend
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 4,
      },
      xaxis: {
        categories: [], // Will be filled with sales data
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      // Using static data first for testing
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id, // Date (or category)
        y: item.totalSales, // Sales value
      }));

      // Update chart state with formatted data
      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x), // Dates on X-axis
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <div className="mt-20">
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] p-6 bg-gray-100">
        {/* Stats Section */}
        <div className="w-full flex justify-around flex-wrap gap-6">
          {/* Sales Card */}
          <div className="rounded-lg bg-gradient-to-r from-pink-600 to-pink-400 p-6 w-[20rem] mt-5 shadow-lg">
            <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
              $
            </div>
            <p className="mt-5 text-white">Sales</p>
            <h1 className="text-3xl font-bold text-white">
              {salesLoading ? <Loader /> : `$${sales?.totalSales.toFixed(2)}`}
            </h1>
          </div>

          {/* Customers Card */}
          <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 p-6 w-[20rem] mt-5 shadow-lg">
            <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
              👥
            </div>
            <p className="mt-5 text-white">Customers</p>
            <h1 className="text-3xl font-bold text-white">
              {customersLoading ? <Loader /> : customers?.length}
            </h1>
          </div>

          {/* Orders Card */}
          <div className="rounded-lg bg-gradient-to-r from-green-600 to-green-400 p-6 w-[20rem] mt-5 shadow-lg">
            <div className="font-bold rounded-full w-[3rem] bg-white text-center p-3">
              📦
            </div>
            <p className="mt-5 text-white">Orders</p>
            <h1 className="text-3xl font-bold text-white">
              {ordersLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        {/* Sales Trend Chart */}
        <div className="mt-12 flex justify-center">
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="80%"
          />
        </div>

        {/* Order List Section */}
        <div className="mt-12">
          <OrderList />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
