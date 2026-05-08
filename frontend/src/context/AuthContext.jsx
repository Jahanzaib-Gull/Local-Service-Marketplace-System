import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });

  useEffect(() => {
    // Maintenance effect to ensure sync if needed
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo && !user) {
      setUser(JSON.parse(userInfo));
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      throw error.response && error.response.data.message
        ? new Error(error.response.data.message)
        : new Error(error.message);
    }
  };

  const register = async (userData) => {
    try {
      // Map 'owner' -> 'HomeOwner', 'provider' -> 'ServiceProvider' for Backend compatibility
      const mappedRole = userData.role === 'owner' ? 'HomeOwner' : 'ServiceProvider';
      
      const { data } = await api.post('/auth/register', {
        ...userData,
        role: mappedRole
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      throw error.response && error.response.data.message
        ? new Error(error.response.data.message)
        : new Error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
