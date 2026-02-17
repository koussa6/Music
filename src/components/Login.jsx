import React, { useState } from 'react';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
const Login = () => {
  const [email, setEmail] = useState('');
  const [type, setType] = useState('password');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, setShowRegister } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      setError('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        toast.error(result.data.message);
        setError(result.message);
      } else {
        toast.success('Logged In');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setError(error.message);
      toast.error('An unexpected error occured.Please try again');
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
                type="text"
                name="email"
                id="email"
                autoComplete="email"
                className=" w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none  hover:border-green-500  transition-all duration-200"
                placeholder="Enter your email"
                required
                value={email}
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
              <div className="flex justify-between w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white hover:border-green-500  transition-all duration-200">
                <input
                  type={type}
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="* * * * * *"
                  className="focus:outline-none w-full"
                  required
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
            <button
              className="w-full boder-none flex justify-center py-3 px-4  rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?
              <NavLink
                onClick={() => setShowRegister(true)}
                to={'/register'}
                className="transition-colors font-medium text-green-400 hover:text-green-300 "
              >
                Register here
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

export default Login;
