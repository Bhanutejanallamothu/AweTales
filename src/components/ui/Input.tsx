import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export default function Input({ label, id, className = '', ...props }: InputProps) {
  return (
    <div className={`input-group ${className}`}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="input-field"
        {...props}
      />
    </div>
  );
}
