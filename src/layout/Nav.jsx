import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
  <div className="flex justify-center w-full text-gray-600 border-t pb-1 py-2 bg-white">
    <NavLink to="/" exact activeClassName="selected-menu-item">
      <div className="flex flex-col items-center mx-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="5 12 3 12 12 3 21 12 19 12" />
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        </svg>
        <span className="text-sm font-semibold">Home</span>
      </div>
    </NavLink>
    <NavLink to="/saved" activeClassName="selected-menu-item">
      <div className="flex flex-col items-center mx-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
        </svg>
        <span className="text-sm font-semibold">Saved</span>
      </div>
    </NavLink>
  </div>
);

export default Nav;
