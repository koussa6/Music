import { createContext, useContext, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
export const AuthProvider = ({ children }) => {
  const API_BASE_URL = 'http://localhost:8080';
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('userToken'));
  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        email,
        password,
      });
      if (response.status === 200) {
        return {
          success: true,
          message: response.data.message || 'Success',
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Registration failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response.data.message || 'Netwokr Error',
      };
    }
  };
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
        portal: 'user',
      });
      if (response.status === 200) {
        setToken(response.data.token);
        setUser({
          email: response.data.email,
          role: response.data.role,
        });
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem(
          'userData',
          JSON.stringify({
            email: response.data.email,
            role: response.data.role,
          }),
        );
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || 'Login failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response.data || 'Netwokr Error',
      };
    }
  };
  const isAuthenticated = () => {
    return !!user && !!token;
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  };
  const contextValue = {
    register,
    login,
    user,
    logout,
    token,
    isAuthenticated,
    loading,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
