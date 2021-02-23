import React from 'react';
import PropTypes from 'prop-types';

const GenericMessage = ({
  title,
  subTitle,
}) => (
  <div className="mt-5 px-10'">
    <h1 className="text-center bg-red-500 font-bold text-white py-4 rounded-md">
      {title}
    </h1>
    {subTitle ? (
      <h3 className="text-center font-bold text-blue-500 py-2 text-xl">
        {subTitle}
      </h3>
    ) : null}
  </div>
);

GenericMessage.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default GenericMessage;
