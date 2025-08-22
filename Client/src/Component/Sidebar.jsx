import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 space-y-4">
      <h1 className="text-xl font-bold">Smart Helpdesk</h1>

      <nav className="flex flex-col space-y-2">
        <Link to="/tickets" className="hover:underline">Tickets</Link>
        {user?.role === "admin" && <Link to="/kb" className="hover:underline">KB Manager</Link>}
        {user?.role === "admin" && <Link to="/settings" className="hover:underline">Settings</Link>}
      </nav>

      <div className="absolute bottom-6 left-4">
        <button onClick={logout} className="text-sm hover:underline">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
