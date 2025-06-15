import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../api/orderApi";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, redirecting to login");
          navigate("/login");
          return;
        }

        console.log("Fetching orders with token:", token);
        const response = await getOrders();
        console.log("Orders response:", response);

        if (response && Array.isArray(response)) {
          console.log("Setting orders:", response);
          setOrders(response);
        } else {
          console.log("Invalid response format:", response);
          setOrders([]);
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        if (err.response?.status === 401) {
          console.log("Unauthorized access, clearing storage and redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        } else {
          setError(err.message || "Failed to fetch orders");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { id: 1, name: "Order Placed", description: "Your order has been received" },
      { id: 2, name: "Processing", description: "Your order is being prepared" },
      { id: 3, name: "Shipped", description: "Your order is on its way" },
      { id: 4, name: "Delivered", description: "Your order has been delivered" },
    ];

    const statusMap = {
      pending: 1,
      processing: 2,
      shipped: 3,
      delivered: 4,
      cancelled: 0,
    };

    const currentStep = statusMap[status?.toLowerCase()] || 0;

    return steps.map((step) => ({
      ...step,
      completed: step.id <= currentStep,
      current: step.id === currentStep,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">No Orders Found</h2>
          <p className="text-gray-600 mb-6 text-lg">You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors text-lg"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">Order #{order._id.slice(-6)}</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items?.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4">
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-800 truncate">{item.productId?.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-800 mt-1">
                            ${((item.productId?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Tracking Timeline */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">Order Tracking</h3>
                  <div className="relative">
                    {getTrackingSteps(order.status).map((step, index) => (
                      <div key={step.id} className="relative pb-8">
                        {index !== getTrackingSteps(order.status).length - 1 && (
                          <div
                            className={`absolute left-4 top-8 w-0.5 h-full ${
                              step.completed ? "bg-blue-500" : "bg-gray-200"
                            }`}
                          />
                        )}
                        <div className="relative flex items-start">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              step.completed
                                ? "bg-blue-500 text-white"
                                : step.current
                                ? "bg-blue-100 text-blue-500 border-2 border-blue-500"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {step.completed ? (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <span className="text-sm font-medium">{step.id}</span>
                            )}
                          </div>
                          <div className="ml-4">
                            <p
                              className={`text-sm font-medium ${
                                step.completed || step.current ? "text-gray-900" : "text-gray-500"
                              }`}
                            >
                              {step.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Shipping Address:</p>
                      <p className="text-sm text-gray-800 mt-1 truncate max-w-[250px]">{order.shippingAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount:</p>
                      <p className="text-xl font-bold text-gray-800 mt-1">${(order.totalAmount || 0).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
