import React from 'react';
import PropTypes from 'prop-types';

const TYPES = {
  focDate: 'Final Order Cutoff :',
  onsaleDate: 'On sale :',
};

const ComicDate = ({ type, date }) => (
  <>
    {TYPES[type] ? (
      <h5>
        {TYPES[type]}
        <span>{date.toLocaleDateString()}</span>
      </h5>
    ) : null}
  </>
);

ComicDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  type: PropTypes.string.isRequired
};

export default ComicDate;
