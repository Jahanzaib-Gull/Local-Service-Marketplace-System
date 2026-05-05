import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, CheckCircle, XCircle, MapPin, DollarSign, ExternalLink, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import api from '../api';
import ChatModal from '../components/ChatModal';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    stats: { availableJobs: 0, activeJobs: 0, completedJobs: 0 },
    recentJobs: [],
    myRecentJobs: []
  });
  const [isLoading, setIsLoading] = useState(true);
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
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbff]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { stats = { availableJobs: 0, activeJobs: 0, completedJobs: 0 }, recentJobs = [], myRecentJobs = [] } = metrics || {};

  return (
    <div className="min-h-screen bg-[#fafbff] pt-32 pb-20 px-6 font-['Plus_Jakarta_Sans',sans-serif]">
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
            <div className="flex items-center gap-2 text-emerald-500 font-extrabold text-sm uppercase tracking-widest mb-2">
              <Briefcase size={16} /> Provider Command Center
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Success is calling, {user?.name?.split(' ')[0]}!</h1>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="secondary" 
              className="px-6 rounded-2xl"
              onClick={() => alert('Your work history is being synchronized!')}
            >
              History
            </Button>
            <Link to="/services">
              <Button variant="emerald" className="px-8 rounded-2xl shadow-emerald-200">Find More Jobs</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl shadow-slate-100/50 group hover:border-emerald-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Opportunities</p>
              <h2 className="text-5xl font-black text-slate-900">{stats.availableJobs}</h2>
            </div>
            <div className="p-6 bg-emerald-50 text-emerald-500 rounded-[1.75rem] group-hover:scale-110 transition-transform">
              <TrendingUp size={32} />
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl shadow-slate-100/50 group hover:border-indigo-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Active Jobs</p>
              <h2 className="text-5xl font-black text-slate-900">{stats.activeJobs}</h2>
            </div>
            <div className="p-6 bg-indigo-50 text-indigo-600 rounded-[1.75rem] group-hover:scale-110 transition-transform">
              <Briefcase size={32} />
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl shadow-slate-100/50 group hover:border-sky-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Completed</p>
              <h2 className="text-5xl font-black text-slate-900">{stats.completedJobs}</h2>
            </div>
            <div className="p-6 bg-sky-50 text-sky-500 rounded-[1.75rem] group-hover:scale-110 transition-transform">
              <CheckCircle size={32} />
            </div>
          </div>
        </div>

        {/* Active Chats */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Conversations</h3>
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">Client Messages</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myRecentJobs.length > 0 ? myRecentJobs.map(booking => (
              <div key={booking._id} className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-xl shadow-slate-100/50 hover:border-indigo-200 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="p-4 bg-indigo-600 text-white rounded-2xl">
                    <MessageSquare size={24} />
                  </div>
                  <button 
                    onClick={() => setChatBooking(booking)}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    Chat with Owner
                  </button>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2">{booking.request?.title}</h4>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-500">{booking.request?.location}</span>
                </div>
              </div>
            )) : (
              <div className="md:col-span-2 py-12 bg-white border border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-400 opacity-60">
                <MessageSquare size={40} className="mb-4" />
                <p className="font-bold">No active chats yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-100 overflow-hidden">
          <div className="px-10 py-8 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Recommended New Job Requests</h3>
            <Link to="/services" className="text-sm font-black text-emerald-500 hover:text-emerald-600">View Marketplace</Link>
          </div>
          
          <div className="divide-y divide-slate-50">
            {recentJobs.length > 0 ? recentJobs.map(job => (
              <div key={job._id} className="p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      {job.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin size={14} />
                      <span className="text-xs font-bold uppercase tracking-wider">{job.location}</span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-2">{job.title}</h4>
                  <p className="text-slate-500 font-medium max-w-2xl line-clamp-1">{job.description}</p>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                  <div className="text-3xl font-black text-emerald-500">${job.budget}</div>
                  <Link to="/services">
                    <Button variant="emerald" className="rounded-xl px-8 shadow-sm">Send Offer</Button>
                  </Link>
                </div>
              </div>
            )) : (
              <div className="p-20 text-center text-slate-400">
                <div className="flex flex-col items-center opacity-30">
                  <TrendingUp size={48} className="mb-4" />
                  <p className="font-black text-xl">No new jobs right now</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
