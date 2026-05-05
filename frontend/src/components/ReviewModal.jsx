import React, { useState } from 'react';
import { Star, X, MessageSquare } from 'lucide-react';
import Button from './Button';
import api from '../api';

const ReviewModal = ({ booking, onClose, onReviewed }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/reviews', {
        bookingId: booking._id,
        rating,
        comment
      });
      alert('Review submitted successfully!');
      onReviewed();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to submit review');
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

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Star size={32} fill="currentColor" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Rate the service</h3>
          <p className="text-slate-500 font-bold mt-1">How was your experience with {booking.provider?.name}?</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setRating(num)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={40} 
                  className={num <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} 
                />
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-black text-slate-700 mb-2 ml-1">Your Feedback</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
              <textarea
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                rows="4"
                placeholder="What did you like? What could be improved?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-4 text-lg" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
