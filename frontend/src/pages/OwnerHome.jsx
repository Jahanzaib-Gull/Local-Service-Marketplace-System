import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ShieldCheck, Clock } from 'lucide-react';

const OwnerHome = () => {
  const features = [
    { icon: Search, title: 'Smart Matching', desc: 'Our intelligent algorithm finds the best professionals near your location rapidly.', color: 'indigo' },
    { icon: ShieldCheck, title: 'Verified Experts', desc: 'Every service provider undergoes a strict background check for your peace of mind.', color: 'emerald' },
    { icon: Clock, title: '24/7 Availability', desc: 'Book a service anytime you need it. We cater to emergency repairs around the clock.', color: 'sky' },
  ];

  const colorMap = {
    indigo: { bg: 'bg-indigo-100/60', text: 'text-indigo-600' },
    emerald: { bg: 'bg-emerald-100/60', text: 'text-emerald-600' },
    sky: { bg: 'bg-sky-100/60', text: 'text-sky-600' },
  };

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find Trusted Local Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">Instantly.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Connect with top-rated plumbers, electricians, cleaners, and technicians in your area. Secure, rapid, and professional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/create-request" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all duration-300 text-base">
              Post a Job <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">Why Choose LSMS for Your Home?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div key={i} className="group bg-white border border-slate-200 rounded-2xl p-8 text-center flex flex-col items-center gap-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-slate-300">
              <div className={`p-5 rounded-2xl ${colorMap[feat.color].bg} ${colorMap[feat.color].text} transition-transform duration-300 group-hover:scale-110`}>
                <feat.icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{feat.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OwnerHome;
