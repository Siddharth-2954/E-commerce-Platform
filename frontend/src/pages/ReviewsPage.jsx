import React from "react";
import ReviewForm from "../components/ReviewForm";

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Reviews</h1>
          <p className="mt-2 text-gray-600">Share your experience with our products</p>
        </div>
        <ReviewForm />
      </div>
    </div>
  );
};

export default ReviewsPage; 