import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetail from "../components/Products/ProductDetail";
import { getProductById } from "../api/productApi";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        if (err.response?.status === 401) {
          // If unauthorized, redirect to login
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'Failed to load product details. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) return <div className="text-center p-4">Loading product details...</div>;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;
  if (!product) return <div className="text-center p-4">Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <ProductDetail product={product} />
    </div>
  );
}
