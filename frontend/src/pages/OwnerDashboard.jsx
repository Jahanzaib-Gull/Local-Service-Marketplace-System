import React, { useState, useEffect } from 'react';
import { Wrench, Bell, CheckCircle, MoreHorizontal, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    fetchMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-500">
        <svg className="animate-spin h-6 w-6 mr-3 text-indigo-600" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        Loading dashboard...
      </div>
    );
  }

  const { stats = { totalRequests: 0, activeJobs: 0, completedJobs: 0 }, recentRequests = [] } = metrics || {};

  const statCards = [
    { label: 'Total Requests', value: stats.totalRequests, icon: Wrench, color: 'indigo', borderColor: 'border-l-indigo-500', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600' },
    { label: 'Active Jobs', value: stats.activeJobs, icon: Bell, color: 'amber', borderColor: 'border-l-amber-400', iconBg: 'bg-amber-100', iconText: 'text-amber-600' },
    { label: 'Completed', value: stats.completedJobs, icon: CheckCircle, color: 'emerald', borderColor: 'border-l-emerald-500', iconBg: 'bg-emerald-100', iconText: 'text-emerald-600' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Owner Dashboard</h1>
          <p className="text-slate-500">Track and manage your service requests effectively.</p>
        </div>
        <Link to="/create-request" className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition-all duration-200 self-start">
          <PlusCircle size={18} /> New Request
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
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

      {/* Recent Requests Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900">Recent Service Requests</h3>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests && recentRequests.length > 0 ? recentRequests.map(req => (
                <tr key={req._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-slate-400">{req._id.substring(0, 8)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{req.title}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{req.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      req.status?.toLowerCase() === 'pending' ? 'bg-amber-100 text-amber-700' :
                      req.status?.toLowerCase() === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-indigo-100 text-indigo-700'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 hidden lg:table-cell">{new Date(req.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400">No recent requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
