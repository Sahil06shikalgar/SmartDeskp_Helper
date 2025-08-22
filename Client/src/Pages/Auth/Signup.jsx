// src/Pages/Auth/Signup.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../Context/Authcontext';
import api from '../../Utils/api';
import API_PATHS from '../../Utils/apiPath';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminInviteToken, setAdminInviteToken] = useState('');
  const [agentInviteToken, setAgentInviteToken] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(API_PATHS.AUTH.REGISTER, {
        name,
        email,
        password,
        adminInviteToken: adminInviteToken || undefined,
        agentInviteToken: agentInviteToken || undefined,
      });

      const { token, ...user } = res.data;
      login(token, user);
      toast.success('Signup successful');

      const roleRoutes = {
        admin: '/kb',
        agent: '/agent',
        user: '/tickets',
      };

      navigate(roleRoutes[user.role] || '/tickets');
    } catch (err) {
      const message = err?.response?.data?.message || 'Signup failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-400 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Signup</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            placeholder="Admin Invite Token "
            value={adminInviteToken}
            onChange={(e) => setAdminInviteToken(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            placeholder="Agent Invite Token "
            value={agentInviteToken}
            onChange={(e) => setAgentInviteToken(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Signup'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
