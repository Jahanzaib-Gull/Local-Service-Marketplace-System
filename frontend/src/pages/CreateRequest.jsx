import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UploadCloud, CheckCircle, MapPin, AlignLeft } from 'lucide-react';
import Input from '../components/Input';

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
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        const errData = await res.json();
        alert(errData.message || 'Failed to submit request');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 animate-fade-in-up">
        <div className="p-6 bg-emerald-100 rounded-full mb-6">
          <CheckCircle size={64} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Request Submitted Successfully!</h2>
        <p className="text-slate-600 text-lg max-w-md">
          Your service request has been posted. Service providers will be able to review and accept your job shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Post a New Job</h1>
        <p className="text-slate-600 text-lg">
          Provide the necessary details so we can match you with the best professionals.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              id="title" 
              label="Job Title" 
              placeholder="e.g. Broken Pipe Repair" 
              value={formData.title}
              onChange={handleChange}
              required 
              className="!mb-0"
            />
            
            <Input 
              id="category"
              label="Category"
              type="select"
              value={formData.category}
              onChange={handleChange}
              required
              className="!mb-0"
            >
              <option value="" disabled>Select a category</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="cleaning">Cleaning</option>
              <option value="hvac">HVAC Repair</option>
              <option value="appliance">Appliance Repair</option>
              <option value="other">Other</option>
            </Input>
          </div>

          <Input 
            id="description"
            label="Job Description"
            type="textarea"
            icon={AlignLeft}
            rows="5"
            placeholder="Please describe the issue in detail..."
            value={formData.description}
            onChange={handleChange}
            required
            className="!mb-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              id="location"
              label="Location"
              icon={MapPin}
              placeholder="Enter your address"
              value={formData.location}
              onChange={handleChange}
              required
              className="!mb-0"
            />
            
            <Input 
              id="budget"
              label="Budget ($)"
              type="number"
              placeholder="150"
              value={formData.budget}
              onChange={handleChange}
              required
              className="!mb-0"
            />
          </div>

          {/* Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-2">Attach Photos (Optional)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 md:p-12 text-center cursor-pointer bg-slate-50 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50/30 group">
              <UploadCloud size={40} className="mx-auto mb-3 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              <p className="font-semibold text-slate-700 mb-1">Click to upload or drag and drop</p>
              <p className="text-sm text-slate-500">PNG, JPG or GIF (max. 5MB)</p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-12 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all duration-200 text-base disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Publish Service Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
