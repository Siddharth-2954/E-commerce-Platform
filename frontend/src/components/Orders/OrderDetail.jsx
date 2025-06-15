import React from "react";

export default function OrderDetail({ order }) {
  if (!order) return <p>Loading order details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded mt-10">
      <h2 className="text-2xl mb-4">Order Details - #{order._id}</h2>
      <p>Status: {order.status}</p>
      <h3 className="mt-4 font-semibold">Items:</h3>
      <ul>
        {order.items.map((item, i) => (
          <li key={i}>
            {item.productName} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}