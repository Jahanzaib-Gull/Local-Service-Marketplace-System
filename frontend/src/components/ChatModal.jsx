import React, { useState, useEffect, useRef } from 'react';
import { Send, X, User, MessageSquare } from 'lucide-react';
import api from '../api';
import Button from './Button';

const ChatModal = ({ booking, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const { data } = await api.get(`/messages/booking/${booking._id}`);
      setMessages(data);
    } catch (err) {
      console.error('Failed to fetch messages', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data } = await api.post('/messages', {
        bookingId: booking._id,
        content: newMessage
      });
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Polling for messages
    return () => clearInterval(interval);
  }, [booking._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl h-[80vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Chat with Service Pro</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project: {booking.request?.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#fafbff]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-slate-400 font-bold">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
              <div className="p-6 bg-white rounded-full shadow-sm"><Send size={32} /></div>
              <p className="font-bold">No messages yet. Start the conversation!</p>
            </div>
          ) : messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`flex flex-col ${msg.sender === booking.provider || (msg.sender?._id === booking.provider) ? 'items-start' : 'items-end'}`}
            >
              <div className={`max-w-[80%] p-5 rounded-3xl font-medium shadow-sm ${
                msg.sender === booking.provider || (msg.sender?._id === booking.provider)
                  ? 'bg-white text-slate-700 rounded-bl-none border border-slate-100' 
                  : 'bg-indigo-600 text-white rounded-br-none shadow-indigo-100'
              }`}>
                {msg.content}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase mt-2 px-2">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-6 bg-white border-t border-slate-100 flex gap-4">
          <input
            type="text"
            className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button type="submit" className="px-8 rounded-2xl">
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
