import React, { useEffect, useState, useContext } from "react";
import { getOrderById } from "../api/orderApi";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);
        setOrder(response.data);
      } catch (err) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user, navigate]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!order) return <p>No order found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Total:</strong> ${order.total.toFixed(2)}
      </p>

      <h2 className="mt-6 text-xl font-semibold">Items</h2>
      <ul className="divide-y divide-gray-300">
        {order.items.map((item) => (
          <li key={item.productId} className="py-3 flex justify-between">
            <span>{item.productName}</span>
            <span>
              Qty: {item.quantity} × ${item.price.toFixed(2)}
            </span>
            <span>${(item.quantity * item.price).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Add back button */}
      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => navigate(-1)}
      >
        Back to Orders
      </button>
    </div>
  );
}