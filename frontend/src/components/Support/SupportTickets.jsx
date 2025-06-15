import React from "react";

export default function SupportTickets({ tickets }) {
  if (!tickets.length) return <p>No support tickets found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Support Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id} className="border p-3 mb-2 rounded">
            <p><strong>Subject:</strong> {ticket.subject}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
