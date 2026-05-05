import React, { useState } from 'react';
import { DollarSign, MessageSquare, X, Send } from 'lucide-react';
import Button from './Button';
import api from '../api';

const OfferModal = ({ request, onClose, onOfferSent }) => {
  const [price, setPrice] = useState(request.budget || '');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/offers', {
        requestId: request._id,
        price,
        message
      });
      alert('Offer sent successfully!');
      onOfferSent();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to send offer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-10 relative animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
        >
          <X size={20} />
        </button>

        <div className="mb-8">
          <h3 className="text-2xl font-black text-slate-900">Send an Offer</h3>
          <p className="text-slate-500 font-bold mt-1">Job: {request.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-widest">Your Rate ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="number"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-black focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 ml-1">Owner's budget: ${request.budget}</p>
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 ml-1 uppercase tracking-widest">Message (Optional)</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
              <textarea
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                rows="3"
                placeholder="Why should the owner choose you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-4 text-lg gap-2" disabled={isLoading}>
            {isLoading ? 'Sending...' : <><Send size={18} /> Send Offer</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OfferModal;
