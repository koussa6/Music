import React, { useState } from 'react';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  const [mode, setMode] = useState('password');
  const navigate = useNavigate();
  const { register } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const result = await register(email, password);
      if (result.success) {
        toast.success(result.message);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center mb-6">
            <img src={assets.logo} alt="" className="w-16 h-16" />
            <h1 className="ml-3 text-3xl font-bold text-white">Musify</h1>
          </div>
          <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold text-white mb-2">Join Musify</h2>
            <p className="text-gray-300">
              Create your account to start listening
            </p>
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
              <div className=" w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white hover:border-green-500  transition-all duration-200">
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className="focus:outline-none w-full bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200 mb-2 block"
              >
                Password
              </label>
              <div className="flex justify-between w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white hover:border-green-500 transition-all duration-200">
                <input
                  type={type}
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="* * * * * *"
                  required
                  className="focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {type === 'text' ? (
                  <Eye
                    className="text-green-100 w-6 h-6 cursor-pointer"
                    onClick={() => setType('password')}
                  />
                ) : (
                  <EyeOff
                    className="text-green-100 w-6 h-6 cursor-pointer"
                    onClick={() => setType('text')}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Confirm Password
              </label>
              <div className="flex justify-between w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white hover:border-green-500  transition-all duration-200">
                <input
                  type={mode}
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="new-password"
                  placeholder="* * * * * *"
                  required
                  className="focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {mode === 'text' ? (
                  <Eye
                    className="text-green-100 w-6 h-6 cursor-pointer"
                    onClick={() => setMode('password')}
                  />
                ) : (
                  <EyeOff
                    className="text-green-100 w-6 h-6 cursor-pointer"
                    onClick={() => setMode('text')}
                  />
                )}
              </div>
            </div>
            <button
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              type="submit"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin border-l-2 border-white rounded-full h-4 w-4"></div>
                  <div> Creating account</div>
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?
              <NavLink
                to="/login"
                className="transition-colors font-medium text-green-400 hover:text-green-300 "
              >
                Sign in here
              </NavLink>
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By creating an account,you agree to our terms of Service and
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
