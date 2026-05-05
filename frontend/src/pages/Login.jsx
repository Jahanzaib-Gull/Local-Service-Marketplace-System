import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorPrompt, setErrorPrompt] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorPrompt(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrorPrompt(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fafbff] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Left Side: Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10 max-w-lg text-center lg:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 font-bold mb-12 hover:text-indigo-300 transition-colors">
            <ArrowLeft size={18} /> Back to home
          </Link>
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Welcome back to the <span className="text-indigo-400">Marketplace</span>.
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            Sign in to manage your requests, connect with experts, and grow your local impact.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 mb-2">Sign In</h1>
            <p className="text-slate-500 font-medium">Enter your credentials to access your account.</p>
          </div>

          {errorPrompt && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 text-sm font-bold mb-8 animate-shake">
              {errorPrompt}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-2">
            <Input 
              id="email"
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input 
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-center justify-between py-2 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm font-bold text-slate-600">Remember me</span>
              </label>
              <button 
                type="button"
                onClick={() => alert('Password reset functionality is coming soon!')}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
              >
                Forgot password?
              </button>
            </div>

            <Button 
              type="submit" 
              className="w-full py-5 text-base font-black rounded-2xl"
              disabled={isLoading}
            >
              {isLoading ? 'Authenticating...' : 'Sign In Now'}
            </Button>
          </form>

          <div className="mt-12 text-center text-slate-500 font-bold">
            New here?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
