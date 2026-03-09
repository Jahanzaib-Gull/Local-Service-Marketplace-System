import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, ShieldCheck, Clock } from 'lucide-react';

const OwnerHome = () => {
  return (
    <div className="home-page">
      <section className="container">
        <div className="flex-col flex-center text-center animate-slide-up" style={{ padding: '8rem 0', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1>Find Trusted Local Services Instantly.</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            Connect with top-rated plumbers, electricians, cleaners, and technicians in your area. Secure, rapid, and professional.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link to="/create-request" className="btn btn-primary">
              Post a Job <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="container delay-100 animate-fade-in" style={{ paddingBottom: '6rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Choose LSMS for Your Home?</h2>
        <div className="grid grid-cols-3">
          <div className="card text-center flex-col flex-center" style={{ gap: '1rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1.25rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
              <Search size={40} />
            </div>
            <h3>Smart Matching</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Our intelligent algorithm finds the best professionals near your location rapidly.</p>
          </div>
          
          <div className="card text-center flex-col flex-center" style={{ gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.25rem', borderRadius: '50%', color: 'var(--success)' }}>
              <ShieldCheck size={40} />
            </div>
            <h3>Verified Experts</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Every service provider undergoes a strict background check for your peace of mind.</p>
          </div>
          
          <div className="card text-center flex-col flex-center" style={{ gap: '1rem' }}>
            <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '1.25rem', borderRadius: '50%', color: 'var(--accent-secondary)' }}>
              <Clock size={40} />
            </div>
            <h3>24/7 Availability</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Book a service anytime you need it. We cater to emergency repairs around the clock.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OwnerHome;
