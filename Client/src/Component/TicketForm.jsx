import React, { useState } from "react";

const TicketForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <textarea
        name="description"
        placeholder="Describe your issue"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full border rounded px-3 py-2"
      />
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit Ticket
      </button>
    </form>
  );
};

export default TicketForm;
