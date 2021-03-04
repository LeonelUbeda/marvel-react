import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SectionCard = ({ link, image, title }) => (
  <Link to={link}>
    <div className="relative h-32 md:h-full w-full">
      <div className="w-full h-full bg-black opacity-25 absolute  rounded-xl" />
      <h3 className="text-2xl font-bold absolute text-white ml-4 mt-2 text-shadow-lg z-10">
        {title}
      </h3>
      <img
        src={image}
        data-testid="image"
        className="h-full w-full object-cover border-lg rounded-xl transition duration-500 hover:scale-150"
        alt={`${title} section`}
      />
    </div>
  </Link>
);

SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default SectionCard;
