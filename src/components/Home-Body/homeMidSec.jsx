import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Diversity2Icon from '@mui/icons-material/Diversity2';

import './homeMidSec.scss';

const HomePageBody = () => {
  const pageSection = () => {
    return (
      <div className='healthcare-HomePageBody'>
        <h1 className='h1-text'>
          Find the best doctors for your needs. 
        </h1>
      </div>
    )
  }
  return (
    <>
      {pageSection()}
    </>
  )
}

export default HomePageBody;
