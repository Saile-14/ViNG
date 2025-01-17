import { authContext } from '@/main';
import React, { useContext } from 'react';
import { Navigate } from 'react-router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signedIn, setSignedIn] = useContext(authContext)
  
  const token = localStorage.getItem('token');


  if (!token) {
    setSignedIn(false);
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;