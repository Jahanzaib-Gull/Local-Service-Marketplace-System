import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      const newSocket = io(window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin);
      setSocket(newSocket);

      newSocket.emit('join', user._id);

      newSocket.on('new_offer', (data) => {
        addNotification(data);
      });

      newSocket.on('offer_accepted', (data) => {
        addNotification(data);
      });

      newSocket.on('new_message', (data) => {
        addNotification(data);
      });

      return () => newSocket.close();
    }
  }, [user]);

  const addNotification = (notif) => {
    setNotifications((prev) => [
      { id: Date.now(), ...notif, read: false },
      ...prev,
    ]);
    
    // Show browser notification if permitted
    if (Notification.permission === 'granted') {
      new Notification('LSMS Update', { body: notif.message });
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <SocketContext.Provider value={{ socket, notifications, markAsRead, clearNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};
