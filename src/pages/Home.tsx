import { useEffect, useState } from "react";
import api from "../components/Api";
import { DashboardType } from "../types/type";

function Home() {
  const [dashboard, setDashboard] = useState<DashboardType>();

  useEffect(() => {
    api.get("/api/statistics/dashboard").then((response) => {
      setDashboard(response.data);
    });
  }, []);

  const stats = [
    { label: "Total Users", value: dashboard?.totalUsers },
    { label: "Total Orders", value: dashboard?.totalOrders },
    { label: "Total Products", value: dashboard?.totalProducts },
    {
      label: "Total Revenue",
      value: `$${Number(dashboard?.totalRevenue).toLocaleString("ru")}`,
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 h-[620px] border-b overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow p-4 border border-gray-200"
          >
            <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
            {stat.value ? (
              <div className="text-2xl font-bold text-gray-800">
                {stat.value}
              </div>
            ) : (
              <div className="h-6 w-full bg-gray-200 animate-pulse rounded" />
            )}
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>
        <div className="grid gap-4">
          {dashboard?.recentOrders?.length ? (
            dashboard.recentOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow p-4 border border-gray-200"
              >
                <div className="space-y-1 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Order ID:</span> {order.id}
                  </p>
                  <p>
                    <span className="font-semibold">Customer ID:</span>{" "}
                    {order.customerId}
                  </p>
                  <p>
                    <span className="font-semibold">Total Price:</span> $
                    {order.totalPrice}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    {order.status}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="h-20 w-full bg-gray-200 animate-pulse rounded" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
