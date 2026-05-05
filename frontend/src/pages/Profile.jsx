import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Mail, Briefcase, FileText, Camera, Save, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import api from '../api';
import MapPicker from '../components/MapPicker';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    avatar: user?.avatar || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s !== '');
      const { data } = await api.put('/users/profile', {
        ...formData,
        skills: skillsArray
      });
      // Update local storage and context
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const newUserInfo = { ...userInfo, ...data };
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbff] pt-32 pb-20 px-6 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-xl shadow-indigo-100">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Profile</h1>
            <p className="text-slate-500 font-bold">Manage your professional identity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sidebar / Avatar */}
          <div className="space-y-8">
            <div className="bg-white border border-slate-100 rounded-[3rem] p-10 text-center shadow-xl shadow-slate-100/50">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 border-4 border-white shadow-inner flex items-center justify-center overflow-hidden">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-slate-300" />
                  )}
                </div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl border-4 border-white hover:scale-110 transition-transform">
                  <Camera size={18} />
                </button>
              </div>
              <h3 className="text-xl font-black text-slate-900">{user?.name}</h3>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mt-1">{user?.role}</p>
              
              <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center gap-6">
                <div className="text-center">
                  <div className="text-xl font-black text-slate-900">4.9</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-slate-900">12</div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jobs</div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <h4 className="text-lg font-black mb-4 relative z-10">Pro Tip</h4>
              <p className="text-indigo-200 text-sm font-medium leading-relaxed relative z-10">
                Detailed profiles with skills and a bio attract 3x more offers!
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-2xl shadow-slate-100/50 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3 ml-1 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="name"
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3 ml-1 uppercase tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="phone"
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-slate-700 mb-3 ml-1 uppercase tracking-widest">Your Location (Select on Map)</label>
                <MapPicker 
                  initialAddress={formData.location} 
                  onLocationSelect={(addr) => setFormData(prev => ({ ...prev, location: addr }))} 
                />
              </div>

              <div>
                <label className="block text-sm font-black text-slate-700 mb-3 ml-1 uppercase tracking-widest">Bio / Description</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-slate-400" size={18} />
                  <textarea
                    name="bio"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all h-32 resize-none"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {user?.role === 'ServiceProvider' && (
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-3 ml-1 uppercase tracking-widest">Skills (Comma separated)</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="skills"
                      type="text"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      placeholder="Plumbing, Electrical, Cleaning..."
                      value={formData.skills}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className={`w-full py-5 text-lg gap-3 rounded-[1.5rem] transition-all ${isSuccess ? 'bg-emerald-500 shadow-emerald-100' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : isSuccess ? <><CheckCircle size={22} /> Profile Updated!</> : <><Save size={22} /> Save Changes</>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
