import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_PATHS } from "../Utils/apiPath";
import TicketCard from "../Component/TicketCard";
import TicketForm from "../Component/TicketForm";

const TicketListPage = () => {
  const [tickets, setTickets] = useState([]);

  // Fetch all tickets from backend
  const fetchTickets = async () => {
  try {
    const res = await axios.get(API_PATHS.TICKETS.GET_ALL);
    setTickets(res.data);
    console.log("Fetched tickets:", res.data);
  } catch (error) {
    if (error.response?.status === 403) {
      console.error("Not authorized. Please log in again.");
    } else {
      console.error("Error fetching tickets:", error);
    }
  }
};

  // Handle creating a new ticket
  const handleTicketSubmit = async (data) => {
    try {
      const res = await axios.post(API_PATHS.TICKETS.CREATE, data);
      console.log("Ticket created:", res.data);
      fetchTickets(); 
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("Failed to create ticket.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Ticket</h2>
      <TicketForm onSubmit={handleTicketSubmit} />
      <h3 className="text-xl font-semibold mt-6 mb-2">All Tickets</h3>
      <div className="space-y-2">
        {tickets.map(ticket => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketListPage;
