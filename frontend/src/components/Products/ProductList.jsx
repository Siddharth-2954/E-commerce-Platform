import React from "react";

export default function ProductList({ products, onSelect }) {
  if (!products.length)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No products found.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => onSelect(product._id)}
          className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col items-center"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-semibold text-xl mb-2 text-center">{product.name}</h3>
          <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}
