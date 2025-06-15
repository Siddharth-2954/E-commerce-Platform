import React from "react";

export default function Cart({ items, onRemove }) {
  if (!items.length) return <p className="text-center">Your cart is empty.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border-b py-4"
          >
            {/* Product Image */}
            {item.productId?.image && (
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-16 h-16 object-cover mr-4 rounded"
              />
            )}

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {item.productId?.name || "Unknown Product"}
              </h3>
              <p className="text-sm text-gray-600">
                {item.productId?.description || "No description available."}
              </p>
              <p className="text-sm text-gray-500">
                Category: {item.productId?.category || "Unknown"}
              </p>
              <p className="text-sm font-bold">
                Price: ${item.productId?.price.toFixed(2) || "0.00"}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-sm">
                Quantity: <strong>{item.quantity}</strong>
              </span>
            </div>

            {/* Remove Button */}
            <button
              className="text-red-600 hover:underline ml-4"
              onClick={() => onRemove(item._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
