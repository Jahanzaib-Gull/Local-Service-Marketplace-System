import React, { useState, useEffect } from 'react';
import { DollarSign, User, Check, X, MessageCircle } from 'lucide-react';
import api from '../api';
import Button from './Button';

const OffersList = ({ requestId, onOfferAccepted }) => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      const { data } = await api.get(`/offers/request/${requestId}`);
      setOffers(data);
    } catch (err) {
      console.error('Failed to fetch offers', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (offerId) => {
    if (!window.confirm('Are you sure you want to accept this offer? This will close the job for other providers.')) return;
    try {
      await api.post(`/offers/${offerId}/accept`);
      alert('Offer accepted! You can now chat with the provider.');
      onOfferAccepted();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept offer');
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [requestId]);

  if (isLoading) return <div className="p-4 text-center text-slate-400 font-bold">Loading offers...</div>;
  if (offers.length === 0) return <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">No offers received yet.</div>;

  return (
    <div className="space-y-4 mt-6">
      <h5 className="text-sm font-black text-slate-400 uppercase tracking-widest ml-1">Received Bids ({offers.length})</h5>
      {offers.map((offer) => (
        <div key={offer._id} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:border-indigo-200 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
                {offer.provider?.name?.charAt(0)}
              </div>
              <div>
                <div className="font-black text-slate-900">{offer.provider?.name}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Verified Professional</div>
              </div>
            </div>
            <div className="text-xl font-black text-emerald-600">${offer.price}</div>
          </div>
          
          {offer.message && (
            <p className="text-sm font-medium text-slate-500 bg-slate-50 p-4 rounded-xl mb-6">
              "{offer.message}"
            </p>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={() => handleAccept(offer._id)}
              className="flex-1 rounded-xl py-3 text-sm gap-2"
            >
              <Check size={16} /> Accept Offer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OffersList;
