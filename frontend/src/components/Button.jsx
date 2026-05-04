import React from 'react';

const variants = {
  primary: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/40',
  outline: 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50',
  danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300',
  success: 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30 hover:bg-emerald-600',
};

const Button = ({ children, variant = 'primary', className = '', style, ...props }) => {
  return (
    <button 
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] || variants.primary} ${className}`} 
      style={style} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
