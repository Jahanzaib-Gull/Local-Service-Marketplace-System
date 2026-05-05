import React, { useState, useEffect } from 'react';
import { Wrench, Bell, CheckCircle, MoreHorizontal, PlusCircle, Activity, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    stats: { totalRequests: 0, activeJobs: 0, completedJobs: 0 },
    recentRequests: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    fetchMetrics();
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

  const { stats = { totalRequests: 0, activeJobs: 0, completedJobs: 0 }, recentRequests = [] } = metrics || {};

  return (
    <div className="min-h-screen bg-[#fafbff] pt-32 pb-20 px-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-sm uppercase tracking-widest mb-2">
              <Layout size={16} /> Owner Control Center
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          </div>
          <Link to="/create-request">
            <Button className="py-4 px-8 rounded-2xl group">
              <PlusCircle size={20} className="group-hover:rotate-90 transition-transform duration-300" /> 
              Post New Request
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 flex items-center justify-between shadow-xl shadow-slate-100/50 group hover:border-indigo-200 transition-all">
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">Total Requests</p>
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

        {/* Table Section */}
        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-100 overflow-hidden">
          <div className="px-10 py-8 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Recent Service History</h3>
            <button className="text-sm font-black text-indigo-600 hover:text-indigo-700">View All Records</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white">
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Job Details</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Budget</th>
                  <th className="px-10 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentRequests.length > 0 ? recentRequests.map(req => (
                  <tr key={req._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-8">
                      <div className="font-extrabold text-slate-900 text-lg mb-1">{req.title}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ref: {req._id.substring(0, 8)}</div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest">{req.category}</span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          req.status?.toLowerCase() === 'pending' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)] animate-pulse' :
                          req.status?.toLowerCase() === 'completed' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' :
                          'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]'
                        }`} />
                        <span className="font-extrabold text-slate-700 text-sm">{req.status}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 font-black text-slate-900">${req.budget}</td>
                    <td className="px-10 py-8 text-right">
                      <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-md transition-all">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-10 py-20 text-center">
                      <div className="flex flex-col items-center opacity-30">
                        <Activity size={48} className="mb-4" />
                        <p className="font-black text-xl">No active history found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
