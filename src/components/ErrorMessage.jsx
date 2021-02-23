import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const ErrorTitle = ({ children }) => (
  <div className="text-center font-bold text-blue-500 py-2 text-xl">
    {children}
  </div>
);

const ErrorMessage = ({
  title,
  actionTitle,
  actionLink,
  className,
}) => {
  const history = useHistory();
  return (
    <div className={className}>
      <h1 className="text-center bg-red-500 font-bold text-white py-4 rounded-md">
        {title}
      </h1>
      {actionLink ? (
        <Link to={actionLink}>
          <ErrorTitle>
            <h1>{actionTitle}</h1>
          </ErrorTitle>
        </Link>
      ) : (
        <ErrorTitle>
          <button onClick={() => history.goBack()} type="button">
            {actionTitle}
          </button>
        </ErrorTitle>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  title: PropTypes.string.isRequired,
  actionTitle: PropTypes.string,
  actionLink: PropTypes.string,
  className: PropTypes.string
};

ErrorMessage.defaultProps = {
  actionTitle: 'Go Back',
  actionLink: null,
  className: 'mt-5 px-10',
};

export default ErrorMessage;
