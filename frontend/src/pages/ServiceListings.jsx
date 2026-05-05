import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const ServiceListings = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All Categories');
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  if (!user || user.role !== 'ServiceProvider') {
    return <Navigate to="/dashboard" replace />;
  }

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/requests');
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAccept = async (id) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await api.post('/bookings/accept', { requestId: id });
      fetchJobs();
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to accept request', err);
      alert(err.response?.data?.message || 'Failed to accept the request.');
    }
  };

  const categories = ['All Categories', 'Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Appliance', 'Painting'];

  const filteredJobs = jobs.filter(job => 
    (filter === 'All Categories' || job.category === filter) &&
    (search === '' || job.title?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Available Jobs Near You</h1>
        <p className="text-slate-600 text-lg">
          Browse open service requests and connect with customers needing your expertise.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search for jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2 min-w-[200px]">
          <Filter size={18} className="text-slate-400 shrink-0" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[30vh] text-slate-500">
          <svg className="animate-spin h-6 w-6 mr-3 text-indigo-600" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          Loading available jobs...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="group bg-white border border-slate-200 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-200">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">{job.category}</span>
                <span className="text-xs text-slate-500 font-medium">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{job.title}</h3>
              <p className="text-slate-600 text-sm mb-5 line-clamp-2 flex-grow">
                {job.description}
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={16} className="text-indigo-500 shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} className="text-sky-500 shrink-0" />
                  Flexible Time
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <DollarSign size={16} className="shrink-0" />
                  ${job.budget}
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <Briefcase size={16} className="shrink-0" />
                  Open
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-4 mt-auto">
                <button 
                  onClick={() => handleAccept(job._id)}
                  className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
                >
                  Accept Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && filteredJobs.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500">
          <Briefcase size={40} className="mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium">No jobs found for the selected category.</p>
          <p className="text-sm mt-1">Try a different filter or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default ServiceListings;
