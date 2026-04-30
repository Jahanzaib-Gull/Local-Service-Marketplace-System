import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('token', userData.token);
=======
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

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
>>>>>>> a147018f94489134dead8237dba47586b1d240eb
    }
  };

  const logout = () => {
    setUser(null);
<<<<<<< HEAD
    localStorage.removeItem('user');
    localStorage.removeItem('token');
=======
    localStorage.removeItem('userInfo');
>>>>>>> a147018f94489134dead8237dba47586b1d240eb
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
