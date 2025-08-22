import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Signup";
import { AuthProvider } from './Context/Authcontext';
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import UserDashboard from "./Pages/Users/UserDashboard";
// import KBList from "./pages/KB/KBList";
// import KBEditor from "./pages/KB/KBEditor";
// import TicketList from "./pages/Tickets/TicketList";
// import TicketDetail from "./pages/Tickets/TicketDetail";
// import Settings from "./pages/Settings";z
// import Navbar from "./components/Navbar";
import { useAuth } from "./Context/Authcontext";
// import KbManager from "./Pages/KBManagerPage";
// import AgentDashboard from "./Pages/Agent/AgentDashboard";
import TicketListPage from "./Pages/TicketListPage";
import TicketDetailPage from "./Pages/TicketDetailPage";
import KBManagerPage from "./Pages/KBManagerPage";
import SettingsPage from "./Pages/SettingPage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  const { user } = useAuth();

  const getDashboardRedirect = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/kb';
    if (user.role === 'agent') return '/agent';
    return '/tickets';
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      <Routes>
        
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
            

          </>
          <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
  path="/kb"
  element={
    <ProtectedRoute role="admin">
      <KBManagerPage />
    </ProtectedRoute>
  }
/>
        <Route
  path="/settings"
  element={
    <ProtectedRoute role="admin">
      <SettingsPage />
    </ProtectedRoute>
  }
/>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/unauthorized" element={<div>You are not authorized to view this page.</div>} />

      </Routes>
    </div>
  );
}

export default App;

