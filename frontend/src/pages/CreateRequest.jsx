import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UploadCloud, CheckCircle, MapPin, AlignLeft, DollarSign, Calendar, ArrowLeft } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../api';

const CreateRequest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    budget: '',
    schedule: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!user || user.role !== 'HomeOwner') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/requests', formData);
      setSubmitted(true);
      setTimeout(() => navigate('/dashboard'), 2500);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'An error occurred while publishing the request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafbff] px-6">
        <div className="max-w-md w-full text-center p-12 bg-white rounded-[3rem] shadow-2xl border border-slate-100 animate-fade-in-up">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Job Published!</h2>
          <p className="text-slate-500 font-bold mb-8 leading-relaxed">Your request is now live. We are notifying the best pros in your area right now.</p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 animate-[progress_2s_ease-in-out]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbff] pt-32 pb-20 px-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-400 font-black mb-8 hover:text-indigo-600 transition-colors uppercase tracking-widest text-xs">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Post a new <span className="text-indigo-600">Job Request</span></h1>
          <p className="text-xl text-slate-500 font-medium">Describe your needs and we'll match you with the right professionals.</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-100/50">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <Input id="title" label="What do you need help with?" placeholder="e.g. Living room wall painting" value={formData.title} onChange={handleChange} required />
              <Input id="category" label="Job Category" type="select" value={formData.category} onChange={handleChange} required>
                <option value="" disabled>Select category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
                <option value="hvac">HVAC Repair</option>
                <option value="appliance">Appliance Repair</option>
                <option value="other">Other</option>
              </Input>
            </div>

            <Input id="description" label="Detailed Description" type="textarea" icon={AlignLeft} rows="4" placeholder="Mention tools needed, specific issues, or special requirements..." value={formData.description} onChange={handleChange} required />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <Input id="location" label="Location" icon={MapPin} placeholder="Enter your address" value={formData.location} onChange={handleChange} required />
              <Input id="budget" label="Est. Budget ($)" type="number" icon={DollarSign} placeholder="150" value={formData.budget} onChange={handleChange} required />
            </div>

            {/* Upload Area */}
            <div className="mb-10 pt-4">
              <label className="block text-sm font-black text-slate-700 mb-3 ml-1 uppercase tracking-widest">Visual Reference (Optional)</label>
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                multiple 
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 0) {
                    alert(`${files.length} file(s) selected: ${files.map(f => f.name).join(', ')}`);
                  }
                }} 
              />
              <label 
                htmlFor="file-upload"
                className="block border-3 border-dashed border-slate-100 rounded-[2rem] p-12 text-center cursor-pointer bg-slate-50/50 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50/30 group"
              >
                <div className="inline-flex p-5 bg-white rounded-2xl shadow-sm text-slate-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all mb-4">
                  <UploadCloud size={32} />
                </div>
                <p className="font-black text-slate-900 mb-1">Click to upload photos</p>
                <p className="text-sm font-bold text-slate-400">Add up to 5 photos for better accuracy</p>
              </label>
            </div>

            <div className="pt-8">
              <Button type="submit" disabled={isLoading} className="w-full py-5 text-lg font-black rounded-2xl shadow-2xl shadow-indigo-100">
                {isLoading ? 'Publishing Request...' : 'Publish Job Request Now'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
