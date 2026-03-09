import React from 'react';

const Input = ({ label, icon: Icon, type = 'text', className = '', style, id, ...props }) => {
  return (
    <div className="form-group" style={style}>
      {label && <label className="form-label" htmlFor={id}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <Icon 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '1.2rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-secondary)' 
            }} 
          />
        )}
        {type === 'select' ? (
          <select 
            id={id} 
            className={`form-select ${className}`} 
            style={{ paddingLeft: Icon ? '3rem' : '1.2rem' }} 
            {...props}
          />
        ) : type === 'textarea' ? (
          <textarea 
            id={id} 
            className={`form-input ${className}`} 
            style={{ 
              paddingLeft: Icon ? '3rem' : '1.2rem', 
              paddingTop: '1rem', 
              resize: 'vertical' 
            }} 
            {...props}
          />
        ) : (
          <input 
            id={id} 
            type={type} 
            className={`form-input ${className}`} 
            style={{ paddingLeft: Icon ? '3rem' : '1.2rem' }} 
            {...props} 
          />
        )}
      </div>
    </div>
  );
};

export default Input;
