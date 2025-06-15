import React, { useState } from "react";

export default function CreateSupportTicket({ onCreate }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ subject, description });
    setSubject("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded mt-4">
      <h2 className="text-2xl mb-4">Create Support Ticket</h2>
      <input
        type="text"
        placeholder="Subject"
        required
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        rows={5}
      />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
}
