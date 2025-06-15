import React from "react";

export default function ReviewList({ reviews }) {
  if (!reviews.length) return <p>No reviews yet.</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h3 className="text-xl mb-3">Reviews:</h3>
      {reviews.map((review) => (
        <div key={review._id} className="border-b py-2">
          <p><strong>{review.userName}</strong> - Rating: {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}