import React, {useLayoutEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from '../Header/header';
import Search from '../Search/search';
import { patientConfig } from '../../config/patientConfig';


import './patientHome.scss';

const PatientHome = props => {
  const {
    errors,
    isLoggedIn,
    loadLoggedinUser,
    profile
  } = props;

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    loadLoggedinUser(token);
  }, [!isLoggedIn]);

  const welcomeText = () => {
    const firstName = _.get(profile, 'user.firstName', '');
    const lastName = _.get(profile, 'user.lastName', '');
    return (
        <div className='patient-section-container'>
          <h1 className='patient-section-container-text'>
            {`Welcome ${firstName}, ${lastName}`}.
          </h1>
        </div>
    );
  }
  const upcomingAppointmentsSnapshot = () => {
    return (
        <div className='patient-section-container'>
          <div className='patient-upcoming-appointments'>
            <h4 className='patient-section-container-text'>
              Upcoming appointments
            </h4>
            <div className='patient-upcoming-appointments-list'>
              You have an upcoming appointment with Dr. ABC at 9.00 AM on 11/01/22.
            </div>
          </div>
        </div>
    );
  }
  const profileSnapshot = () => {
    return (
          <Link className='patient-section-container' to='/patient-home/profile'>
            <div className='patient-section-container'>
              <div className='patient-upcoming-appointments'>
                <h4 className='patient-section-container-text'>
                  Profile
                </h4>
              </div>
            </div>
          </Link>
    );
  }
  return (
    <>
      <Header profilePage/>
      <Search />
      <div className='patient-section'>
        {welcomeText()}
        <div className='patient-section-tabs'>
        {upcomingAppointmentsSnapshot()}
        {profileSnapshot()}
        </div>
      </div>
    </>
  )
}

export default PatientHome;
