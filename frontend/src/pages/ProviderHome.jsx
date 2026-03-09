import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, TrendingUp, Calendar, ArrowRight } from 'lucide-react';

const ProviderHome = () => {
  return (
    <div className="home-page">
      <section className="container">
        <div className="flex-col flex-center text-center animate-slide-up" style={{ padding: '8rem 0', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1>Grow Your Service Business.</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            Find high-quality local jobs, connect directly with homeowners, and manage your schedule seamlessly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/services" className="btn btn-primary" style={{ backgroundColor: 'var(--success)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>
              Browse Available Jobs <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container delay-100 animate-fade-in" style={{ paddingBottom: '6rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Join LSMS as a Provider?</h2>
        <div className="grid grid-cols-3">
          <div className="card text-center flex-col flex-center" style={{ gap: '1rem', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.25rem', borderRadius: '50%', color: 'var(--success)' }}>
              <Briefcase size={40} />
            </div>
            <h3>Consistent Work</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Get notified about dozens of repair, cleaning, and maintenance requests in your area daily.</p>
          </div>
          
          <div className="card text-center flex-col flex-center" style={{ gap: '1rem', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1.25rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
              <TrendingUp size={40} />
            </div>
            <h3>Maximize Earnings</h3>
            <p style={{ color: 'var(--text-secondary)' }}>You set your own terms. Accept the jobs that fit your budget and maximize your daily revenue.</p>
          </div>
          
          <div className="card text-center flex-col flex-center" style={{ gap: '1rem', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '1.25rem', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
              <Calendar size={40} />
            </div>
            <h3>Flexible Schedule</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Work when you want. You are your own boss, bringing absolute control over your availability.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProviderHome;
