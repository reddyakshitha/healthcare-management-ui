import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Diversity2Icon from '@mui/icons-material/Diversity2';

import './header.scss';

const Header = props => {
  const header = () => {
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
        (<div className='healthcare-logon'>
        Profile
        </div>) : !props.loginPage ? (<Link to="/login">
          <div className='healthcare-logon'>
            Log in
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
