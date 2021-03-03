import React from 'react';
import PropTypes from 'prop-types';

const ErrorInline = ({ title, action, className }) => (
  <div
    className={`text-center bg-red-500 font-bold text-white rounded-md flex items-center h-16 md:h-12 px-2 sm:px-4  ${className}`}
  >
    <h1 className="text-xs md:text-lg">{title}</h1>
    <button className="ml-auto px-5 h-full" type="button" onClick={action}>
      X
    </button>
  </div>
);

ErrorInline.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ErrorInline.defaultProps = { className: '' };

export default ErrorInline;
