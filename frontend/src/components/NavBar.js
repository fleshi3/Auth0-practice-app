import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';

const NavBar = props => {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <div className="navbar">
      <NavLink to="/">Q&A App</NavLink>
      {!auth0Client.isAuthenticated() && (
        <div className="authButton">
          <button onClick={auth0Client.signIn}>Sign In</button>
        </div>
      )}
      {auth0Client.isAuthenticated() && (
        <div className="authButton">
          <label className="authUser">{auth0Client.getProfile().name}</label>
          <button
            onClick={() => {
              signOut();
            }}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default withRouter(NavBar);
