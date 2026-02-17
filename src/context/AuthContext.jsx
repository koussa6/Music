import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = JSON.stringify('adminUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/auth/login`,
        { email, password, portal: 'admin' },
      );

      setToken(response.data.token);
      setUser({
        email: response.data.email,
        role: response.data.role,
      });

      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem(
        'adminUser',
        JSON.stringify({
          email: response.data.email,
          role: response.data.role,
        }),
      );

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Network Error',
      };
    }
  };
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
  };
  const isAuthenticated = () => {
    return !!token && !!user;
  };
  const isAdmin = () => {
    return user && user.role === 'ADMIN';
  };
  useEffect(() => {
    const storedToken = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const context = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
