import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

const ProviderHome = () => {
  const features = [
    { icon: Briefcase, title: 'Consistent Work', desc: 'Get notified about dozens of repair, cleaning, and maintenance requests in your area daily.' },
    { icon: TrendingUp, title: 'Maximize Earnings', desc: 'You set your own terms. Accept the jobs that fit your budget and maximize your daily revenue.' },
    { icon: Calendar, title: 'Flexible Schedule', desc: 'Work when you want. You are your own boss, bringing absolute control over your availability.' },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Grow Your Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Business.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Find high-quality local jobs, connect directly with homeowners, and manage your schedule seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 hover:shadow-emerald-500/40 transition-all duration-300 text-base">
              Browse Available Jobs <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-16">Why Join LSMS as a Provider?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => {
            const colors = ['bg-emerald-100/60 text-emerald-600', 'bg-indigo-100/60 text-indigo-600', 'bg-sky-100/60 text-sky-600'];
            return (
              <div key={i} className="group bg-white border border-emerald-100 rounded-2xl p-8 text-center flex flex-col items-center gap-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-emerald-300">
                <div className={`p-5 rounded-2xl ${colors[i]} transition-transform duration-300 group-hover:scale-110`}>
                  <feat.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{feat.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProviderHome;
