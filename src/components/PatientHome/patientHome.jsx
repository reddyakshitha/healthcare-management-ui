import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import Search from '../Search/search';
import { patientConfig } from '../../config/patientConfig';


import './patientHome.scss';

const PatientHome = () => {
  const pageSection = () => {
    const cards = patientConfig.map((item, idx) => {
      return (
        <div className={item.containerClassname} key={idx}>
          <div className={item.classname}>
            {item.cardName}
          </div>
          <Link className={item.buttonClassname}>
            <button className={item.buttonClassname}>
              View details
            </button>
          </Link>
        </div>
      )
    })
    return (
      cards
    );
  }
  return (
    <>
      <Header profilePage/>
      <Search />
      <div className='patient-section-container'>
        {pageSection()}
      </div>
    </>
  )
}

export default PatientHome;
