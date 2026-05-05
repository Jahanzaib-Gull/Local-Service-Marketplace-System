import React, { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, CheckCircle, XCircle, MapPin, DollarSign, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    stats: { availableJobs: 0, activeJobs: 0, completedJobs: 0 },
    recentJobs: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://local-service-marketplace-system.onrender.com/api/dashboard/metrics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setMetrics(data);
    } catch (err) {
      console.error('Failed to fetch metrics', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleAction = async (id, action) => {
    if (action === 'accept') {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://local-service-marketplace-system.onrender.com/api/bookings/accept', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ requestId: id })
        });
        if (res.ok) fetchMetrics();
      } catch (err) {
        console.error('Failed to accept request', err);
      }
    } else {
      setMetrics(prev => ({
        ...prev,
        recentJobs: prev.recentJobs.filter(req => req._id !== id)
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbff]">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { stats = { availableJobs: 0, activeJobs: 0, completedJobs: 0 }, recentJobs = [] } = metrics || {};

  return (
    <div className="min-h-screen bg-[#fafbff] pt-32 pb-20 px-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-sm uppercase tracking-widest mb-2">
              <TrendingUp size={16} /> Provider Workspace
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Success is calling, {user?.name?.split(' ')[0]}!</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" className="px-6 rounded-2xl">History</Button>
            <Button variant="emerald" className="px-8 rounded-2xl shadow-emerald-200">Find More Jobs</Button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 flex items-center justify-between border border-slate-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Opportunities</p>
              <h2 className="text-5xl font-black text-white">{stats.availableJobs}</h2>
            </div>
            <div className="relative z-10 p-6 bg-emerald-500 text-white rounded-[1.75rem] shadow-xl shadow-emerald-500/20">
              <Briefcase size={32} />
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl shadow-slate-100/50 group hover:border-indigo-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Active Jobs</p>
              <h2 className="text-5xl font-black text-slate-900">{stats.activeJobs}</h2>
            </div>
            <div className="p-6 bg-indigo-50 text-indigo-600 rounded-[1.75rem] group-hover:scale-110 transition-transform">
              <CheckCircle size={32} />
            </div>
          </div>
        </div>

        {/* Latest Requests */}
        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-100 overflow-hidden">
          <div className="px-10 py-8 bg-slate-50/50 border-b border-slate-100">
            <h3 className="text-xl font-black text-slate-900">Recommended New Job Requests</h3>
          </div>
          
          <div className="divide-y divide-slate-50">
            {recentJobs.length > 0 ? recentJobs.map(req => (
              <div key={req._id} className="p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:bg-slate-50/20 transition-all group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">{req.category}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job ID: {req._id.substring(0, 8)}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{req.title}</h3>
                  <div className="flex flex-wrap gap-6 mt-4">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-sm"><MapPin size={16} className="text-emerald-500" /> {req.location}</div>
                    <div className="flex items-center gap-2 text-slate-900 font-black text-sm"><DollarSign size={16} className="text-emerald-600" /> ${req.budget}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                  <Button 
                    variant="emerald" 
                    className="rounded-2xl px-10 py-4"
                    onClick={() => handleAction(req._id, 'accept')}
                  >
                    Accept Job
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="p-4 rounded-2xl"
                    onClick={() => handleAction(req._id, 'reject')}
                  >
                    <XCircle size={22} className="text-slate-400" />
                  </Button>
                </div>
              </div>
            )) : (
              <div className="p-20 text-center text-slate-400">
                <p className="font-black text-xl mb-2">No new requests in your area</p>
                <p className="font-medium">Check back soon for new opportunities.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
