import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Wrench } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page" style={{ position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - 80px)' }}>
      {/* Animated background shapes */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>

      <section className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="flex-col flex-center text-center animate-slide-up" style={{ padding: '8rem 0', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Local Service Marketplace System</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            Are you looking to hire a professional or are you a professional looking for work?
          </p>
          
          <div className="grid grid-cols-2" style={{ gap: '2rem', width: '100%', marginTop: '3rem' }}>
            <div className="card glass card-interactive flex-col flex-center text-center" style={{ padding: '3.5rem 2.5rem', gap: '1.5rem', cursor: 'pointer' }} onClick={() => navigate('/owner')}>
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1.75rem', borderRadius: '50%', color: 'var(--accent-primary)', transition: 'all 0.4s' }} className="hover-scale">
                <HomeIcon size={48} />
              </div>
              <h2>I am a House Owner</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Find trusted professionals for your home repairs, cleaning, and more.</p>
              <Link to="/owner" className="btn btn-primary" style={{ width: '100%' }}>Explore Services</Link>
            </div>

            <div className="card glass card-interactive flex-col flex-center text-center" style={{ padding: '3.5rem 2.5rem', gap: '1.5rem', cursor: 'pointer' }} onClick={() => navigate('/provider')}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.75rem', borderRadius: '50%', color: 'var(--success)', transition: 'all 0.4s' }} className="hover-scale">
                <Wrench size={48} />
              </div>
              <h2>I am a Service Provider</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Find jobs, connect with clients and grow your local service business.</p>
              <Link to="/provider" className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--success)', color: 'var(--success)' }}>Find Jobs</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
