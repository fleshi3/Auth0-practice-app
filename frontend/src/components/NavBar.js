import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink to="/">Q&A App</NavLink>
    </div>
  );
};

export default NavBar;
