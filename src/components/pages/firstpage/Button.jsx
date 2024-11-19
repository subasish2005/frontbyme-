// eslint-disable-next-line no-unused-vars
import React from 'react';
import styles from './Button.module.css';

// eslint-disable-next-line react/prop-types
export const Button = ({ variant = 'primary', children, ...props }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};