import React from "react";
import { useAuth } from "../Hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Welcome, {user?.name}</h2>
      <span className="text-sm text-gray-500">Role: {user?.role}</span>
    </header>
  );
};

export default Header;
