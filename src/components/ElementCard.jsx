import React from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const ExtraCard = ({ title, className }) => (
  <span className={`px-2 py-1 rounded-md my-1 ${className}`} key={nanoid()}>
    {title}
  </span>
);

const ElementCard = ({ link, title, image, extras }) => (
  <Link to={link}>
    <div className="w-full flex flex-col items-center w-full h-full relative">
      <div className="w-auto relative">
        <img
          src={image}
          alt={`${title} cover`}
          className="h-96 w-auto md:h-64 lg:h-96 object-cover rounded-md shadow-md"
        />
        {extras.length > 0 ? (
          <div className="extras my-2 flex items-end w-full text-white text-xs absolute top-0 left-0 flex flex-col transform translate-x-3">
            {extras.map((extra) => (
              <ExtraCard title={extra.title} className={extra.className} key={nanoid()} />
            ))}
          </div>
        ) : null}
      </div>
      <h5 className="whitespace-pre-wrap font-semibold mt-1 text-lg text-gray-700 uppercase mx-4 sm:mx-1">
        {title}
      </h5>
    </div>
  </Link>
);

const extraShape = PropTypes.shape({
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
});

ElementCard.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  extras: PropTypes.arrayOf(extraShape),
};

ElementCard.defaultProps = { extras: [] };

export default ElementCard;
