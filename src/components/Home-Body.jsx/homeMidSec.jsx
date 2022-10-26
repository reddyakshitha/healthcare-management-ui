import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Diversity2Icon from '@mui/icons-material/Diversity2';

import './homeMidSec.scss';

const Header = () => {
  const header = () => {
    return (
      <div className='healthcare-header'>
        <div className='healthcare-logo'>
          <Diversity2Icon
            sx={{ fontSize: 50, color: "#07234B", padding: "0 10px" }} //0078bf
          />
          HMS
        </div>
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
