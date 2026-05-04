import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wrench, Menu, X, LayoutDashboard, PlusCircle, Briefcase, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const NavLink = ({ to, children, icon: Icon }) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive(to)
          ? 'text-indigo-600 bg-indigo-50'
          : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
      }`}
    >
      {Icon && <Icon size={15} />}
      {children}
    </Link>
  );

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/80'
        : 'bg-white/70 backdrop-blur-md border-b border-slate-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-500/30 group-hover:bg-indigo-700 transition-colors duration-200">
            <Wrench size={18} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            LSM<span className="text-indigo-600">S</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink to="/">Home</NavLink>
          {user ? (
            <>
              {user.role === 'ServiceProvider' && (
                <NavLink to="/services" icon={Briefcase}>Find Jobs</NavLink>
              )}
              {user.role === 'HomeOwner' && (
                <NavLink to="/create-request" icon={PlusCircle}>Post Job</NavLink>
              )}
              <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 ml-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4 ml-4">
              <NavLink to="/login" icon={LogIn}>Login</NavLink>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-95"
              >
                <UserPlus size={16} />
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pb-4 flex flex-col gap-1 border-t border-slate-100 pt-3 bg-white/95 backdrop-blur-xl">
          <NavLink to="/">Home</NavLink>
          {user ? (
            <>
              {user.role === 'ServiceProvider' && (
                <NavLink to="/services" icon={Briefcase}>Find Jobs</NavLink>
              )}
              {user.role === 'HomeOwner' && (
                <NavLink to="/create-request" icon={PlusCircle}>Post Job</NavLink>
              )}
              <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 mt-2 px-3 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-200 w-full"
              >
                <LogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 mt-2">
              <NavLink to="/login" icon={LogIn}>Login</NavLink>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <UserPlus size={15} />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
