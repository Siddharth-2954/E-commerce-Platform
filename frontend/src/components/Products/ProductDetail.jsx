import React, { useState } from "react";
import { addToCart as addToCartAPI } from "../../api/cartApi";

export default function ProductDetail({ product }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      // Call backend add to cart API with productId and quantity
      await addToCartAPI(product._id, 1);
      alert(`${product.name} has been added to your cart!`);
    } catch (error) {
      console.error("Add to cart error:", error);
      alert(error.response?.data?.message || "Failed to add to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-h-96 object-contain mb-6 rounded"
      />
      <div className="w-full space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">Description:</span> {product.description}
        </p>
        <p>
          <span className="font-semibold">Price:</span>{" "}
          <span className="text-green-600 font-bold">₹{product.price}</span>
        </p>
        <p>
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p>
          <span className="font-semibold">Stock:</span> {product.stock}
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0 || loading}
        className={`mt-8 w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
          product.stock <= 0 || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
