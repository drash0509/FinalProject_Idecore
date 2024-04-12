import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import Cookies from "js-cookie";

const Graph = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [data, setData] = useState({ completed: [], pending: [] });

  const sellerUserToken = Cookies.get("seller_user");

  useEffect(async () => {
    const fetchSellerOrder = async () => {
      try {
        const res = await axios.get("http://localhost:4001/get_seller_order", {
          headers: {
            Authorization: `Bearer ${sellerUserToken}`,
          },
        });
        console.log("res.data.data", res.data.data);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching seller order:", error);
      }
    };

    fetchSellerOrder();
  }, [sellerUserToken]);

  console.log("selectedPeriod : ", selectedPeriod);
  let filteredSales = [];

  // console.log("data : ", data);

  if (data && data.completed && data.pending) {
    filteredSales =
      selectedPeriod === "week"
        ? data.completed
            .filter((stat) => {
              console.log("stat : ", stat);
              const currentDate = new Date();
              console.log("currentDate : ", currentDate);
              const sevenDaysAgo = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - 6
              );
              const statDate = new Date(stat.item.timestamp);
              console.log("statDate : ", statDate);
              const data1 = statDate >= sevenDaysAgo && statDate <= currentDate;
              console.log("data1 : ", data1);
              return statDate >= sevenDaysAgo && statDate <= currentDate;
            })
            .concat(
              data.pending.filter((stat) => {
                const currentDate = new Date();
                const sevenDaysAgo = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate() - 6
                );
                const statDate = new Date(stat.item.timestamp);
                return statDate >= sevenDaysAgo && statDate <= currentDate;
              })
            )
        : selectedPeriod === "month"
        ? data.completed
            .filter((stat) => {
              const currentDate = new Date();
              const firstDayOfMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                1
              );
              const lastDayOfMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                0
              );
              const statDate = new Date(stat.item.timestamp);
              return statDate >= firstDayOfMonth && statDate <= lastDayOfMonth;
            })
            .concat(
              data.pending.filter((stat) => {
                const currentDate = new Date();
                const firstDayOfMonth = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  1
                );
                const lastDayOfMonth = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  0
                );
                const statDate = new Date(stat.item.timestamp);
                return (
                  statDate >= firstDayOfMonth && statDate <= lastDayOfMonth
                );
              })
            )
        : selectedPeriod === "year"
        ? data.completed
            .filter((stat) => {
              const currentDate = new Date();
              return (
                new Date(stat.item.timestamp).getFullYear() ===
                currentDate.getFullYear()
              );
            })
            .concat(
              data.pending.filter((stat) => {
                const currentDate = new Date();
                return (
                  new Date(stat.item.timestamp).getFullYear() ===
                  currentDate.getFullYear()
                );
              })
            )
        : [];
  }

  console.log("filteredSales : ", filteredSales);

  // const productStatusData = {
  //   completed: filteredSales
  //     .filter((data) => data.item.statusOfDelivery === "completed") // Filter completed sales
  //     .reduce((acc, curr) => {
  //       // Iterate over completed sales
  //       const productsQuantity = curr.products.reduce(
  //         (total, product) => total + product.quantity,
  //         0
  //       );
  //       return acc + productsQuantity; // Sum up the quantities
  //     }, 0),
  //   incomplete: filteredSales
  //     .filter((data) => data.item.statusOfDelivery === "incomplete") // Filter incomplete sales
  //     .reduce((acc, curr) => {
  //       const productsQuantity = curr.products.reduce(
  //         (total, product) => total + product.quantity,
  //         0
  //       );
  //       return acc + productsQuantity;
  //     }, 0),
  //   pending: filteredSales
  //     .filter((data) => data.item.statusOfDelivery === "pending") // Filter pending sales
  //     .reduce((acc, curr) => {
  //       const productsQuantity = curr.products.reduce(
  //         (total, product) => total + product.quantity,
  //         0
  //       );
  //       return acc + productsQuantity; // Sum up the quantities
  //     }, 0), // Sum up the ordersPending
  // };

  const productStatusData = {
    completed: filteredSales.filter(
      (product) => product.item.statusOfDelivery === "completed"
    ),
    // incomplete: filteredSales.filter(
    //   (product) => product.item.statusOfDelivery === "incomplete"
    // ),
    pending: filteredSales.filter(
      (product) => product.item.statusOfDelivery === "pending"
    ),
  };

  console.log("productStatusData : ", productStatusData);

  const salesTrendData = filteredSales.map((stat) => [
    new Date(stat.item.timestamp).getTime(),
    stat.revenue,
  ]);

  const productSalesData = filteredSales.flatMap((stat) =>
    stat.productsSold.map((product) => ({
      name: product.productName,
      revenue: product.revenue,
    }))
  );

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Product Status",
    },
    series: [
      {
        name: "Orders",
        data: Object.entries(productStatusData).map(([status, count]) => ({
          name: status,
          y: count,
        })),
      },
    ],
  };

  const trendOptions = {
    chart: {
      type: "line",
    },
    title: {
      text: "Sales Trend",
    },
    xAxis: {
      type: "datetime",
    },
    series: [
      {
        name: "Revenue",
        data: salesTrendData,
      },
    ],
  };

  const barOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Product Sales",
    },
    xAxis: {
      categories: productSalesData.map((product) => product.name),
    },
    series: [
      {
        name: "Revenue",
        data: productSalesData.map((product) => product.revenue),
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-black text-3xl my-3 font-bold">YOUR SALES DATA:</h1>
      <select
        className="block w-full bg-white border border-gray-300 p-2 rounded-md mb-4"
        value={selectedPeriod}
        onChange={(e) => setSelectedPeriod(e.target.value)}
      >
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Product Status</h2>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Sales Trend</h2>
          <HighchartsReact highcharts={Highcharts} options={trendOptions} />
        </div>
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Product Sales</h2>
          <HighchartsReact highcharts={Highcharts} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
