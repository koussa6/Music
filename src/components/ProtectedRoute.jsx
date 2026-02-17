import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin border-b-2 border-green-500 rounded-full h-12 w-12 mx-auto mb-4" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  // if (requireAdmin && !isAdmin()) {
  //   return (
  //     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
  //       <div className="text-center ">
  //         <div className="animate-spin border-b-2 border-green-500 rounded-full h-12 w-12 mx-auto mb-4" />
  //         <p className="text-white font-bold">Access Denied</p>
  //       </div>
  //       <p className="text-gray-300 text-lg">
  //         You need admin privilates to access this page
  //       </p>
  //     </div>
  //   );
  // }
  return children;
};

export default ProtectedRoute;
