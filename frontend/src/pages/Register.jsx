import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Home as HomeIcon, Phone, MapPin, UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('owner');
  const [isLoading, setIsLoading] = useState(false);
  const [errorPrompt, setErrorPrompt] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorPrompt(null);
    try {
      await register({ name, email, password, role, phone, location });
      navigate('/dashboard');
    } catch (error) {
      setErrorPrompt(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fafbff] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Left side: Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8 lg:p-20 relative overflow-y-auto">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        
        <div className="w-full max-w-xl relative z-10">
          <Link to="/" className="inline-flex lg:hidden items-center gap-2 text-indigo-600 font-bold mb-8">
            <ArrowLeft size={18} /> Home
          </Link>
          
          <div className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium">Join our ecosystem and start connecting with local experts.</p>
          </div>

          {errorPrompt && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-bold mb-8">
              {errorPrompt}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Input label="Full Name" icon={User} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Email" type="email" icon={Mail} placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input label="Password" type="password" icon={Lock} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Input label="Phone" icon={Phone} placeholder="+1 555-0123" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <div className="md:col-span-2">
                <Input label="Location" icon={MapPin} placeholder="New York, USA" value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-black text-slate-700 mb-4 ml-1">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  className={`flex items-center gap-4 p-5 rounded-[1.5rem] border-2 transition-all duration-300 ${
                    role === 'owner' 
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100' 
                      : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${role === 'owner' ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>
                    <HomeIcon size={20} />
                  </div>
                  <span className="font-extrabold text-sm">House Owner</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`flex items-center gap-4 p-5 rounded-[1.5rem] border-2 transition-all duration-300 ${
                    role === 'provider' 
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-lg shadow-emerald-100' 
                      : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${role === 'provider' ? 'bg-emerald-500 text-white' : 'bg-slate-100'}`}>
                    <Briefcase size={20} />
                  </div>
                  <span className="font-extrabold text-sm">Provider</span>
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full py-5 text-base font-black rounded-2xl" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Get Started Now'}
            </Button>
          </form>

          <div className="mt-10 text-center text-slate-500 font-bold">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700">Sign in</Link>
          </div>
        </div>
      </div>

      {/* Right side: Visual */}
      <div className="hidden lg:flex lg:w-2/5 bg-slate-900 relative items-center justify-center p-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-600/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[80px]"></div>
        
        <div className="relative z-10">
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 max-w-xs">
              <div className="flex gap-1 mb-4 text-amber-400"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
              <p className="text-white font-medium italic mb-4 text-sm">"The best platform I've used to grow my plumbing business. Incredible clients."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500"></div>
                <div className="text-xs font-bold text-white">Marc S. <span className="block text-slate-400 font-medium">Plumber Expert</span></div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 max-w-xs ml-12">
              <p className="text-white font-medium italic mb-4 text-sm">"Found a cleaner for my penthouse in minutes. Seamless and secure."</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500"></div>
                <div className="text-xs font-bold text-white">Sarah L. <span className="block text-slate-400 font-medium">House Owner</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
