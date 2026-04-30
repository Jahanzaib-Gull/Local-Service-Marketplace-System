import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wrench, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container flex-between">
        <Link to="/" className="brand">
          <Wrench className="brand-icon" size={28} />
          <span>LSMS</span>
        </Link>
        
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setMenuOpen(false)}>Home</Link>
          
          {user ? (
            <>
              {user.role === 'ServiceProvider' && (
                <Link to="/services" className={`nav-link ${isActive('/services')}`} onClick={() => setMenuOpen(false)}>Find Jobs</Link>
              )}
              {user.role === 'HomeOwner' && (
                <Link to="/create-request" className={`nav-link ${isActive('/create-request')}`} onClick={() => setMenuOpen(false)}>Post Job</Link>
              )}
              <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`} onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button className="btn btn-outline" onClick={handleLogout} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Register</Link>
            </>
          )}
        </div>
        
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' }}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
