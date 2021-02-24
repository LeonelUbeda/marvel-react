import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SectionCard = ({ section }) => (
  <Link to={section.link}>
    <div className="relative h-32 md:h-full w-full">
      <div className="w-full h-full bg-black opacity-25 absolute  rounded-xl" />
      <h3 className="text-2xl font-bold absolute text-white ml-4 mt-2 text-shadow-lg z-10">
        {section.title}
      </h3>
      <img
        src={section.src}
        className="h-full w-full object-cover border-lg rounded-xl transition duration-500 hover:scale-150"
        alt={`${section.title} section`}
      />
    </div>
  </Link>
);

SectionCard.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  }).isRequired
};

export default SectionCard;
