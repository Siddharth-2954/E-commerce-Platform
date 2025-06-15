import React from "react";

export default function OrdersList({ orders, onSelect }) {
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <div>
      <h2 className="text-2xl mb-4">Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li
            key={order._id}
            className="border p-4 mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(order._id)}
          >
            Order #{order._id} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
