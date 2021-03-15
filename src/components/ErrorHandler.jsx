import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { removeError } from '../store/errors/errors.actions';
import ErrorMessage from './ErrorMessage';

const ErrorHandler = ({ children }) => {
  const { error } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  useEffect(
    () => () => {
      dispatch(removeError());
    },
    []
  );
  return (
    <>
      {error ? (
        <ErrorMessage
          title={error.message || 'Application Error'}
          actionLink="/"
          actionTitle="Go home"
        />
      ) : (
        children
      )}
    </>
  );
};

ErrorHandler.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorHandler;
