import React, { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    stats: { availableJobs: 0, activeJobs: 0, completedJobs: 0 },
    recentJobs: [],
    myRecentJobs: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/dashboard/metrics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setMetrics(data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard metrics', err);
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
        const res = await fetch('http://localhost:5000/api/bookings/accept', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ requestId: id })
        });
        
        if (res.ok) {
          fetchMetrics();
        } else {
          const data = await res.json();
          alert(data.message || 'Failed to accept the request.');
        }
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
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500">
        <svg className="animate-spin h-6 w-6 mr-3 text-emerald-600" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        Loading dashboard...
      </div>
    );
  }

  const { stats = { availableJobs: 0, activeJobs: 0, completedJobs: 0 }, recentJobs = [] } = metrics || {};

  const statCards = [
    { label: 'Available Jobs', value: stats.availableJobs, icon: Briefcase, borderColor: 'border-l-indigo-500', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600' },
    { label: 'Accepted Jobs', value: stats.activeJobs, icon: TrendingUp, borderColor: 'border-l-emerald-500', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-fade-in-up">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Provider Dashboard</h1>
        <p className="text-slate-500">Review new requests and manage your active jobs.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {statCards.map((card, i) => (
          <div key={i} className={`bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between border-l-4 ${card.borderColor} shadow-sm`}>
            <div>
              <p className="text-sm font-semibold text-slate-500 mb-1">{card.label}</p>
              <h2 className="text-3xl font-bold text-slate-900">{card.value}</h2>
            </div>
            <div className={`p-3 rounded-full ${card.iconBg}`}>
              <card.icon size={22} className={card.iconText} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Jobs Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">Latest Service Requests</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID & Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs && recentJobs.length > 0 ? recentJobs.map(req => (
                <tr key={req._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-slate-900">{req.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{req._id.substring(0, 8)}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{req.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-700 hidden lg:table-cell">{req.location}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-emerald-600">${req.budget}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleAction(req._id, 'accept')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <CheckCircle size={13} /> Accept
                      </button>
                      <button 
                        onClick={() => handleAction(req._id, 'reject')}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-red-600 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <XCircle size={13} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">No fresh requests right now.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
