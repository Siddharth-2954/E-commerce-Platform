import React, { useEffect, useState } from "react";
import ProductList from "../components/Products/ProductList";
import { getAllProducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => alert("Failed to load products"));
  }, []);

  const handleSelect = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductList products={products} onSelect={handleSelect} />
    </div>
  );
}