import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Wrench } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-slate-50 flex items-center justify-center">
      {/* Decorative background gradients (Tailwind way) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-sky-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Local Service Marketplace</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Are you looking to hire a trusted professional, or are you a skilled provider looking for local work?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12">
            
            {/* Owner Card */}
            <div 
              onClick={() => navigate('/owner')}
              className="group relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.3)] hover:border-indigo-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 p-6 bg-indigo-100/50 text-indigo-600 rounded-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white shadow-sm">
                <HomeIcon size={48} strokeWidth={1.5} />
              </div>
              
              <h2 className="relative z-10 text-2xl font-bold text-slate-900 mb-4">I am a House Owner</h2>
              <p className="relative z-10 text-slate-600 mb-8 flex-grow">Find highly-rated professionals for your home repairs, deep cleaning, landscaping, and more.</p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); navigate('/owner'); }}
                className="relative z-10 w-full py-4 px-6 bg-indigo-600 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-indigo-700 hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] transition duration-300"
              >
                Explore Services
              </button>
            </div>

            {/* Provider Card */}
            <div 
              onClick={() => navigate('/provider')}
              className="group relative bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-10 flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] hover:border-emerald-300"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 p-6 bg-emerald-100/50 text-emerald-600 rounded-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white shadow-sm">
                <Wrench size={48} strokeWidth={1.5} />
              </div>
              
              <h2 className="relative z-10 text-2xl font-bold text-slate-900 mb-4">I am a Service Provider</h2>
              <p className="relative z-10 text-slate-600 mb-8 flex-grow">Find high-paying local jobs, connect with reliable clients, and rapidly grow your business.</p>
              
              <button 
                onClick={(e) => { e.stopPropagation(); navigate('/provider'); }}
                className="relative z-10 w-full py-4 px-6 bg-white text-emerald-600 border-2 border-emerald-500 font-semibold rounded-xl hover:bg-emerald-50 transition duration-300"
              >
                Find Jobs
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
