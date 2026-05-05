import React from 'react';

const Input = ({ label, icon: Icon, type = 'text', className = '', id, ...props }) => {
  const baseClasses = 'w-full px-5 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-sm font-medium placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white shadow-sm';

  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="block text-sm font-bold text-slate-700 mb-2.5 ml-1" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon 
            size={18} 
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 group-focus-within:text-indigo-500"
          />
        )}
        {type === 'select' ? (
          <select 
            id={id} 
            className={`${baseClasses} appearance-none cursor-pointer ${Icon ? 'pl-14' : 'px-5'}`}
            {...props}
          />
        ) : type === 'textarea' ? (
          <textarea 
            id={id} 
            className={`${baseClasses} resize-none ${Icon ? 'pl-14' : 'px-5'} pt-4`}
            {...props}
          />
        ) : (
          <input 
            id={id} 
            type={type} 
            className={`${baseClasses} ${Icon ? 'pl-14' : 'px-5'}`}
            {...props} 
          />
        )}
      </div>
    </div>
  );
};

export default Input;
