// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ 
  variant = 'primary',
  size,
  className = '',
  children,
  loading,
  disabled,
  ...props 
}) => {
  const buttonClasses = [
    'global-button',
    variant,
    size,
    loading ? 'loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  size: 'medium',
  loading: false,
  disabled: false
};
