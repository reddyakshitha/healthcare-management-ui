import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Diversity2Icon from '@mui/icons-material/Diversity2';

import './header.scss';

const Header = () => {
  const header = () => {
    return (
      <div className='healthcare-header'>
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
        <div className='healthcare-logon'>
          Log in
        </div>
      </div>
    )
  }
  return (
    <>
      {header()}
    </>
  )
}

export default Header;
