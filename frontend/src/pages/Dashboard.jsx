import React from 'react';
import { useAuth } from '../context/AuthContext';
import OwnerDashboard from './OwnerDashboard';
import ProviderDashboard from './ProviderDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === 'provider' ? <ProviderDashboard /> : <OwnerDashboard />;
};

export default Dashboard;
