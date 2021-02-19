import React from 'react';

const TYPES = {
  focDate: 'Final Order Cutoff :',
  onsaleDate: 'On sale :',
};

export default ({ type, date }) => (
  <>
    {TYPES[type] ? (
      <>
        <h5>
          {TYPES[type]}
          <span>{new Date(date).toLocaleDateString()}</span>
        </h5>
      </>
    ) : null}
  </>
);
