import React, { useState, useEffect } from 'react';
import { Wrench, Bell, CheckCircle, MoreHorizontal, PlusCircle, Activity, Layout, Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import api from '../api';
import ReviewModal from '../components/ReviewModal';
import OffersList from '../components/OffersList';
import ChatModal from '../components/ChatModal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    stats: { totalRequests: 0, activeJobs: 0, completedJobs: 0 },
    recentRequests: [],
    recentBookings: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [chatBooking, setChatBooking] = useState(null);

  const fetchMetrics = async () => {
    try {
      const { data } = await api.get('/dashboard/metrics');
      setMetrics(data);
    } catch (err) {
      console.error('Failed to fetch metrics', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbff]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-slate-400 animate-pulse">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  const { stats = { totalRequests: 0, activeJobs: 0, completedJobs: 0 }, recentRequests = [], recentBookings = [] } = metrics || {};

  return (
    <div className="min-h-screen bg-[#fafbff] pt-32 pb-20 px-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {selectedBooking && (
        <ReviewModal 
          booking={selectedBooking} 
          onClose={() => setSelectedBooking(null)} 
          onReviewed={fetchMetrics} 
        />
      )}

      {chatBooking && (
        <ChatModal 
          booking={chatBooking} 
          onClose={() => setChatBooking(null)} 
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm uppercase tracking-widest mb-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Owner Control Center
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/create-request">
              <Button className="py-4 px-8 rounded-2xl group">
                <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" /> 
                Post New Request
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl shadow-slate-100/50 group hover:border-indigo-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Total Posts</p>
              <h2 className="text-5xl font-black text-slate-900">{stats.totalRequests}</h2>
            </div>
            <div className="p-6 bg-indigo-50 text-indigo-600 rounded-[1.75rem] group-hover:scale-110 transition-transform">
              <Activity size={32} />
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl shadow-slate-100/50 group hover:border-amber-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Active Jobs</p>
              <h2 className="text-5xl font-black text-slate-900">{stats.activeJobs}</h2>
            </div>
            <div className="p-6 bg-amber-50 text-amber-500 rounded-[1.75rem] group-hover:scale-110 transition-transform">
              <Wrench size={32} />
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl shadow-slate-100/50 group hover:border-emerald-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Completed</p>
              <h2 className="text-5xl font-black text-slate-900">{stats.completedJobs}</h2>
            </div>
            <div className="p-6 bg-emerald-50 text-emerald-500 rounded-[1.75rem] group-hover:scale-110 transition-transform">
              <CheckCircle size={32} />
            </div>
          </div>
        </div>

        {/* Active Bookings (Post-Acceptance) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Job Interactions</h3>
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest">In Progress</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentBookings.filter(b => b.status === 'accepted').length > 0 ? recentBookings.filter(b => b.status === 'accepted').map(booking => (
              <div key={booking._id} className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl shadow-slate-100/50 hover:border-indigo-200 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                    <MessageSquare size={24} />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setChatBooking(booking)}
                      className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      Live Chat
                    </button>
                  </div>
                </div>
                
                <h4 className="text-xl font-black text-slate-900 mb-2">{booking.request?.title}</h4>
                <p className="text-sm font-bold text-slate-500 mb-6">Pro: <span className="text-slate-900">{booking.provider?.name}</span></p>

                {/* Mini Tracking Map */}
                <div className="h-40 rounded-[2rem] overflow-hidden mb-8 border border-slate-100 shadow-inner relative z-0">
                  <MapContainer center={[31.5204, 74.3587]} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[31.5204, 74.3587]}>
                      <Popup>Service Location</Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <Button 
                  onClick={() => setSelectedBooking(booking)}
                  className="w-full gap-2 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200"
                >
                  <Star size={18} /> Finish & Rate Service
                </Button>
              </div>
            )) : (
              <div className="md:col-span-2 py-12 bg-white border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 opacity-60">
                <MessageSquare size={40} className="mb-4" />
                <p className="font-bold">No active chats. Accept an offer to start communicating.</p>
              </div>
            )}
          </div>
        </div>

        {/* Completed Jobs History */}
        {recentBookings.filter(b => b.status === 'completed').length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Completed History</h3>
              <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">Archive</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentBookings.filter(b => b.status === 'completed').map(booking => (
                <div key={booking._id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <h5 className="font-black text-slate-900">{booking.request?.title}</h5>
                    <p className="text-xs font-bold text-slate-400">Pro: {booking.provider?.name}</p>
                  </div>
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={20} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requests & Offers (Pre-Acceptance) */}
        <div className="space-y-10">
          <div className="px-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Your Open Requests</h3>
            <p className="text-slate-500 font-bold">Review incoming offers from verified providers</p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {recentRequests.filter(r => r.status === 'pending').map(req => (
              <div key={req._id} className="bg-slate-50/50 border border-slate-100 rounded-[3.5rem] p-10">
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                  <div>
                    <span className="px-4 py-1.5 bg-white border border-slate-100 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">
                      Ref: {req._id.substring(0, 8)}
                    </span>
                    <h4 className="text-3xl font-black text-slate-900 mb-2">{req.title}</h4>
                    <p className="text-slate-500 font-medium max-w-2xl">{req.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Budget</div>
                    <div className="text-4xl font-black text-indigo-600">${req.budget}</div>
                  </div>
                </div>

                {/* Bids List for this request */}
                <OffersList requestId={req._id} onOfferAccepted={fetchMetrics} />
              </div>
            ))}
            
            {recentRequests.filter(r => r.status === 'pending').length === 0 && (
              <div className="py-20 bg-white border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400">
                <Activity size={48} className="mb-4 opacity-20" />
                <p className="font-bold">No pending requests. Post a job to see offers!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
