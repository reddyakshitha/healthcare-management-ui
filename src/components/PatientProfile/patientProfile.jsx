import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import Search from '../Search/search';
import { patientConfig } from '../../config/patientConfig';


import './patientProfile.scss';

const PatientProfile = () => {
  const personalInformation = () => {
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-upcoming-appointments'>
            Personal Information
          </h1>
        </div>
    );
  }
  const upcomingAppointmentsSnapshot = () => {
    return (
        <div className='patient-profile-section-container'>
          <div className='patient-upcoming-appointments'>
            <h4 className='patient-profile-section-container-text'>
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
          <Link className='patient-profile-section-container' to='/patient-home/profile'>
            <div className='patient-profile-section-container'>
              <div className='patient-upcoming-appointments'>
                <h4 className='patient-profile-section-container-text'>
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
      <div className='patient-profile-section'>
        {personalInformation()}
      </div>
    </>
  )
}

export default PatientProfile;
