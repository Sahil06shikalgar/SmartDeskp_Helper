import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../Utils/api";
import { API_PATHS } from "../Utils/apiPath";
import AgentSuggestion from "../Component/AgentSuggestion";
import { useNavigate } from 'react-router-dom';

const TicketDetailPage = () => {
  const { id } = useParams(); // ticket ID from URL param
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [status, setStatus] = useState("");

  // Fetch ticket details on mount
  const fetchTicket = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_PATHS.TICKETS.GET_ONE(id));
      setTicket(res.data);
      setStatus(res.data.status);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  // Submit reply / status update
  const handleReplySubmit = async () => {
    try {
      await axios.post(API_PATHS.TICKETS.UPDATE, {
        reply: replyText,
        status,
      });
      setReplyText("");
      fetchTicket(); // Refresh ticket after update
      alert("Reply sent successfully");
      navigate('/tickets');
    } catch (err) {
      alert("Failed to send reply");
    }
  };

  if (loading) return <div>Loading ticket details...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>
      <p><strong>Description:</strong> {ticket.description}</p>
      <p>
        <strong>Status:</strong>{" "}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-1 mt-2"
        >
          {["open", "triaged", "waiting_human", "resolved", "closed"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </p>
      <p className="mt-4"><strong>Category:</strong> {ticket.category || "N/A"}</p>
      <p className="mt-4"><strong>Created By:</strong> {ticket.createdBy?.name} ({ticket.createdBy?.email})</p>
      <p className="mt-4"><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
      <p className="mt-4"><strong>Assignee:</strong> {ticket.assignee ? `${ticket.assignee.name} (${ticket.assignee.email})` : "Unassigned"}</p>

      {/* Agent Suggestion (draft reply etc) */}
      <AgentSuggestion ticketId={id} />

      {/* Reply form */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Add Reply / Update Status</h2>
        <textarea
          rows={4}
          className="w-full border rounded p-2"
          placeholder="Write your reply here..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
            <button
            onClick={handleReplySubmit}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            
            >
            Send Reply 
            </button>
        </div>

      {/* TODO: Audit timeline here */}
    </div>
  );
};

export default TicketDetailPage;
