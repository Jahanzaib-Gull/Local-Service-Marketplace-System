import React from 'react';

const Card = ({ children, className = '', style, onClick, ...props }) => {
  return (
    <div 
      className={`bg-white border border-slate-200 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 ${onClick ? 'cursor-pointer' : ''} ${className}`} 
      style={style} 
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
