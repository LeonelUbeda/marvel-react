import React from 'react';
import PropTypes from 'prop-types';
import LoadingAnimation from './LoadingAnimation';

const LoadingHandler = ({ isLoading, children }) => (
  <>{isLoading ? <LoadingAnimation /> : children}</>
);

LoadingHandler.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoadingHandler;
