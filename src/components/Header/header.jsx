/*eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './header.scss';
const Header = props => {
  const {
    signOut
  } = props;
  const handleProfilePage = () => {
    return (
      <Navigate to="/patient-home" />
    )
  }
  const handleSignout = () => {
    signOut();
  }
  const header = () => {
    const firstName = _.get(props.profile, 'user.firstName', '');
    return (
      <div className={`healthcare-header ${props.loginPage && 'healtchcare-login'}`}>
        <Link to="/">
        <div
          className='healthcare-logo'
          >
          <Diversity2Icon
            sx={{ fontSize: 50, color: "#07234B", padding: "0 10px" }} //0078bf
          />
          HMS
        </div>
        </Link>
        {props.profilePage ?
        (
          <Link to="/">
            <div
            className='healthcare-logon'
            onClick={handleSignout}
            >
          <AccountCircleIcon
            sx={{ fontSize: 50, color: "#07234B", padding: "0 10px" }} //0078bf
          />
          Sign Out
          </div>
        </Link>) : !props.loginPage ? (<Link to="/login">
          <div
            className='healthcare-logon'
            onClick={handleProfilePage}
          >
            {props.isLoggedIn ?
            <>
            <AccountCircleIcon
              sx={{ fontSize: 50, color: "#07234B", padding: "0 10px" }} //0078bf
            />
            {firstName}
            </>  : 'Log in'}
          </div>
        </Link>) : null}
      </div>
    )
  }
  return (
    <>
      {header()}
    </>
  )
}
Header.propTypes = {
  loginPage: PropTypes.bool,
  profilePage: PropTypes.bool
};


Header.defaultProps = {
  loginPage: false,
  profilePage: false
};


export default Header;
