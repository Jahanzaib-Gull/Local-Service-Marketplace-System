import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Hammer, Menu, X, LayoutDashboard, PlusCircle, Briefcase, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';

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
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
        isActive(to)
          ? 'text-indigo-600 bg-indigo-50/80 shadow-sm'
          : 'text-slate-600 hover:text-indigo-600 hover:bg-white hover:shadow-md'
      }`}
    >
      {Icon && <Icon size={16} className={isActive(to) ? 'text-indigo-600' : 'text-slate-400'} />}
      {children}
    </Link>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 pt-4`}>
      <div className={`max-w-7xl mx-auto px-6 h-20 flex items-center justify-between transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-2xl shadow-2xl shadow-slate-200/50 rounded-[2rem] border border-white/40' 
          : 'bg-white/50 backdrop-blur-lg rounded-[2rem] border border-white/20'
      }`}>
        
        {/* Brand */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-3 group">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-500">
            <Hammer size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 uppercase">
            Perfect <span className="text-indigo-600">Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          <NavLink to={user ? "/dashboard" : "/"}>Home</NavLink>
          {user ? (
            <>
              {user.role === 'ServiceProvider' && <NavLink to="/services" icon={Briefcase}>Browse Jobs</NavLink>}
              {user.role === 'HomeOwner' && <NavLink to="/create-request" icon={PlusCircle}>Post Job</NavLink>}
              <NavLink to="/profile" icon={UserPlus}>Profile</NavLink>
              <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              
              <div className="w-px h-6 bg-slate-200 mx-2" />
              <NotificationDropdown />
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3 ml-4">
              <NavLink to="/login" icon={LogIn}>Login</NavLink>
              <Link
                to="/register"
                className="flex items-center gap-2 px-7 py-3 text-sm font-extrabold text-white bg-indigo-600 rounded-[1.25rem] shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
              >
                <UserPlus size={18} />
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-3 rounded-2xl text-slate-600 bg-white/50 hover:bg-white shadow-sm transition-all duration-300"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-6 right-6 mt-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] p-8 shadow-2xl border border-white/50 space-y-3">
          <div className="flex items-center justify-between px-4 pb-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Navigation</h4>
            <NotificationDropdown />
          </div>
          <NavLink to={user ? "/dashboard" : "/"}>Home</NavLink>
          {user ? (
            <>
              {user.role === 'ServiceProvider' && <NavLink to="/services" icon={Briefcase}>Browse Jobs</NavLink>}
              {user.role === 'HomeOwner' && <NavLink to="/create-request" icon={PlusCircle}>Post Job</NavLink>}
              <NavLink to="/profile" icon={UserPlus}>Profile</NavLink>
              <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-4 text-sm font-bold text-red-500 bg-red-50/50 rounded-2xl transition-all"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
              <NavLink to="/login" icon={LogIn}>Login</NavLink>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-5 text-sm font-extrabold text-white bg-indigo-600 rounded-[1.5rem] shadow-xl shadow-indigo-500/30 active:scale-95 transition-all"
              >
                <UserPlus size={20} /> Join Marketplace
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
