import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const ErrorHandler = ({ children, error }) => (
  <>
    {error ? (
      <ErrorMessage
        title="Application Error"
        actionLink="/"
        actionTitle="Go home"
      />
    ) : (
      children
    )}
  </>
);

ErrorHandler.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.oneOf([
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    null,
  ]),
};

ErrorHandler.defaultProps = {
  error: null,
};

export default ErrorHandler;
