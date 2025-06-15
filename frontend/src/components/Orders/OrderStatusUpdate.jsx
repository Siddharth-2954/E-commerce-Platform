import React, { useState } from "react";

export default function OrderStatusUpdate({ currentStatus, onUpdate }) {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(status);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label htmlFor="status" className="mr-2 font-semibold">
        Update Status:
      </label>
      <select id="status" value={status} onChange={handleChange} className="border p-1 rounded">
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
      <button type="submit" className="ml-2 bg-blue-600 text-white p-1 rounded">
        Update
      </button>
    </form>
  );
}
