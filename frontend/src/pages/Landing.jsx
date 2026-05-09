import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Wrench, ShieldCheck, Zap, Star, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

// Import catchment images
import CleaningImg from '../assets/images/cleaning.png';
import InspectionImg from '../assets/images/inspection.png';
import RunningImg from '../assets/images/running.png';
import HammerImg from '../assets/images/with hammer.png';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="relative min-h-screen bg-[#fafbff] overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-emerald-100/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-sky-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6">
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-10 mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-extrabold text-slate-600 tracking-wider uppercase">Trusted by 5,000+ Providers</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.05] max-w-5xl animate-fade-in-up">
            Find the perfect <span className="text-indigo-600">Pro</span> for any task <span className="relative">instantly<span className="absolute bottom-2 left-0 w-full h-4 bg-indigo-200/60 -z-10 rounded-full"></span></span>.
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
            The world's most sophisticated marketplace for local services. Plumbers, cleaners, and experts at your fingertips.
          </p>
        </div>

        {/* Choice Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Owner Card */}
          <div 
            onClick={() => navigate('/owner')}
            className="group relative bg-white border border-slate-100 rounded-[3rem] p-12 overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-5 hover:shadow-[0_40px_100px_-20px_rgba(79,70,229,0.15)] hover:border-indigo-200"
          >
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-48 h-48 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 mb-10 inline-flex p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/50 group-hover:rotate-6 transition-all duration-500">
              <HomeIcon size={48} strokeWidth={2} />
            </div>

            <h2 className="relative z-10 text-4xl font-black text-slate-900 mb-4">I want to Hire</h2>
            <p className="relative z-10 text-slate-500 text-lg mb-10 leading-relaxed max-w-xs">Access top-tier professionals for your home, office, and events with absolute security.</p>
            
            <div className="relative z-10 flex items-center gap-4 text-indigo-600 font-black text-lg group/btn">
              Explore Services <div className="p-2.5 bg-indigo-50 rounded-2xl group-hover/btn:translate-x-2 transition-all"><ArrowRight size={20} /></div>
            </div>
          </div>

          {/* Provider Card */}
          <div 
            onClick={() => navigate('/provider')}
            className="group relative bg-slate-900 rounded-[3rem] p-12 overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-5 hover:shadow-[0_40px_100px_-20px_rgba(16,185,129,0.3)] border border-slate-800"
          >
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-48 h-48 bg-emerald-500/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 mb-10 inline-flex p-8 bg-emerald-500 text-white rounded-[2.5rem] shadow-2xl shadow-emerald-500/50 group-hover:-rotate-6 transition-all duration-500">
              <Wrench size={48} strokeWidth={2} />
            </div>

            <h2 className="relative z-10 text-4xl font-black text-white mb-4">I want to Work</h2>
            <p className="relative z-10 text-slate-400 text-lg mb-10 leading-relaxed max-w-xs">Monetize your skills, reach verified clients, and build your digital service empire today.</p>
            
            <div className="relative z-10 flex items-center gap-4 text-emerald-400 font-black text-lg group/btn">
              Join as Provider <div className="p-2.5 bg-emerald-500/10 rounded-2xl group-hover/btn:translate-x-2 transition-all"><ArrowRight size={20} /></div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-6xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-20">
          
          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 relative">
              <div className="p-5 bg-indigo-50 text-indigo-600 rounded-[2rem] relative z-10">
                <ShieldCheck size={40} />
              </div>
              <img src={InspectionImg} alt="Verified" className="absolute -top-12 -right-12 w-24 h-24 object-contain animate-float" />
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-3">Verified Pros</h4>
            <p className="text-slate-500 font-medium leading-relaxed px-4">Every professional undergoes a 7-step background verification.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 relative">
              <div className="p-5 bg-emerald-50 text-emerald-600 rounded-[2rem] relative z-10">
                <Zap size={40} />
              </div>
              <img src={RunningImg} alt="Instant" className="absolute -top-12 -right-12 w-24 h-24 object-contain animate-float animation-delay-1000" />
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-3">Instant Match</h4>
            <p className="text-slate-500 font-medium leading-relaxed px-4">Find an expert in under 60 seconds with our AI matching.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="mb-6 relative">
              <div className="p-5 bg-amber-50 text-amber-600 rounded-[2rem] relative z-10">
                <Star size={40} />
              </div>
              <img src={CleaningImg} alt="Rated" className="absolute -top-12 -right-12 w-24 h-24 object-contain animate-float animation-delay-2000" />
            </div>
            <h4 className="text-2xl font-black text-slate-900 mb-3">Top Rated</h4>
            <p className="text-slate-500 font-medium leading-relaxed px-4">Average service rating of 4.9/5 from 100k+ reviews.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
