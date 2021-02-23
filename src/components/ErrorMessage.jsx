import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const ErrorTitle = ({ children }) => (
  <h3 className="text-center font-bold text-blue-500 py-2 text-xl">
    {children}
  </h3>
);

export default ({
  title,
  actionTitle = 'Go back',
  actionLink = null,
  className = 'mt-5 px-10',
}) => {
  const history = useHistory();
  return (
    <div className={className}>
      <h1 className="text-center bg-red-500 font-bold text-white py-4 rounded-md">
        {title}
      </h1>
      {actionLink ? (
        <Link to={actionLink}>
          <ErrorTitle>{actionTitle}</ErrorTitle>
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
