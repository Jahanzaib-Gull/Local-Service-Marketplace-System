import React from 'react';

const variants = {
  primary: 'bg-indigo-600 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:bg-indigo-700 hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 active:scale-95',
  secondary: 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 hover:-translate-y-0.5 active:scale-95',
  emerald: 'bg-emerald-500 text-white shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:bg-emerald-600 hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5 active:scale-95',
  ghost: 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 active:scale-95',
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button 
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] || variants.primary} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
