import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { Eye, EyeOff } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('password');

  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();

  // Redirect if already logged in
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        toast.error(result.data?.message || 'Login failed');
      } else {
        toast.success('Logged In');
        navigate('/add-song');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center mb-6">
            <img src={assets.logo} alt="Logo" className="w-16 h-16" />
            <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
          </div>
          <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold text-white mb-2">Join Musify</h2>
            <p className="text-gray-300">Sign in to continue listening</p>
          </div>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-200 mb-2 block"
              >
                Email address
              </label>
              <input
                type="email" /* Changed to email for better mobile UX */
                name="email"
                id="email"
                value={email}
                autoComplete="email"
                className="w-full px-4 py-3 border border-cyan-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none hover:border-cyan-900 transition-all duration-200"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200 mb-2 block"
              >
                Password
              </label>
              <div className="flex items-center justify-between w-full px-4 py-3 border border-cyan-700 rounded-lg bg-gray-800/50 text-white hover:border-cyan-900 transition-all duration-200">
                <input
                  type={type}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="******"
                  className="bg-transparent focus:outline-none w-full text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setType(type === 'password' ? 'text' : 'password')
                  }
                  className="focus:outline-none ml-2"
                >
                  {type === 'text' ? (
                    <Eye className="text-gray-400 w-5 h-5 cursor-pointer hover:text-white" />
                  ) : (
                    <EyeOff className="text-gray-400 w-5 h-5 cursor-pointer hover:text-white" />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-br from-[#00b36b] via-[#0081a7] to-[#0052cc] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
              type="submit"
            >
              {loading ? 'Signing In...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <NavLink
                to="/register"
                className="transition-colors font-medium text-cyan-400 hover:text-cyan-300 hover:underline"
              >
                Register here
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
