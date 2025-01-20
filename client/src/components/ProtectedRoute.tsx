import { AuthContext } from '@/main';
import React, { useContext } from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext)
  
  const token = localStorage.getItem('token');


  if (!token) {
    auth?.setSignedIn(false);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;