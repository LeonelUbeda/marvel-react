import React from 'react';

export default ({ isUp, sizeClassName = 'w-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${sizeClassName} inline transition duration-200 ease-in-out transform rotate-90 
        ${!isUp ? 'rotate-180' : null}`}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="18" y1="11" x2="12" y2="5" />
    <line x1="6" y1="11" x2="12" y2="5" />
  </svg>
);
