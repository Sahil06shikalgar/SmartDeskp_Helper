import React from "react";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  return (
    <Link
      to={`/tickets/${ticket._id}`}
      className="block border p-4 rounded shadow hover:bg-gray-100"
    >
      <h2 className="text-lg font-semibold">{ticket.title}</h2>
      <p className="text-sm text-gray-600">{ticket.description.slice(0, 80)}...</p>
      <div className="text-xs text-gray-500 mt-2">
        Status: <strong>{ticket.status}</strong> | Priority: {ticket.priority}
      </div>
    </Link>
  );
};

export default TicketCard;
