import React from 'react';

const Input = ({ label, icon: Icon, type = 'text', className = '', style, id, ...props }) => {
  const baseClasses = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white';

  return (
    <div className={`mb-4 ${className}`} style={style}>
      {label && (
        <label className="block text-sm font-semibold text-slate-600 mb-2" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon 
            size={18} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
        {type === 'select' ? (
          <select 
            id={id} 
            className={`${baseClasses} appearance-none cursor-pointer`}
            style={{ paddingLeft: Icon ? '3rem' : '1rem' }} 
            {...props}
          />
        ) : type === 'textarea' ? (
          <textarea 
            id={id} 
            className={`${baseClasses} resize-y`}
            style={{ paddingLeft: Icon ? '3rem' : '1rem', paddingTop: '1rem' }} 
            {...props}
          />
        ) : (
          <input 
            id={id} 
            type={type} 
            className={baseClasses}
            style={{ paddingLeft: Icon ? '3rem' : '1rem' }} 
            {...props} 
          />
        )}
      </div>
    </div>
  );
};

export default Input;
