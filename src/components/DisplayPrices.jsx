import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const TYPES = { printPrice: 'Print' };

const DisplayPrices = ({ prices }) => (
  <div className="w-full flex flex-wrap ">
    {prices.map((price) => (
      <span className="text-gray-700 mr-3" key={nanoid(5)}>
        {`${TYPES[price.type] ? TYPES[price.type] : null} `}
        <span className="text-teal-700">{`$${price.price}`}</span>
      </span>
    ))}
  </div>
);

DisplayPrices.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired
};

export default DisplayPrices;
