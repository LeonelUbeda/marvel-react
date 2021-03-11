import React from 'react';
import PropTypes from 'prop-types';

const TYPES = { printPrice: 'Print', digitalPurchasePrice: 'Digital' };

const Price = ({ type, price }) => (
  <span className="text-gray-700 mr-3 element-price">
    <span>{`${TYPES[type] ? TYPES[type] : 'Unknown'} `}</span>
    <span className="text-teal-700">{`$${price}`}</span>
  </span>
);

Price.propTypes = {
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Price;
