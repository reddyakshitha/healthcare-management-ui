import React, {useLayoutEffect, useEffect, useState} from 'react';
import moment from 'moment';
import {Link, Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from '../Header/header';
import Search from '../Search/search';
import { patientConfig } from '../../config/patientConfig';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import {TimeConfig} from './timeConfig';


import './doctorHome.scss';

const DoctorHome = props => {
  const {
    errors,
    isLoggedIn,
    loadLoggedinUser,
    profile,
    signOut,
    loading,
    getAllDoctors,
    allDoctors,
    setUniqueApptArr
  } = props;

  useEffect(() => {
      getAllDoctors()
  }, []);

  const [upcomingApptNav, setUpcomingAppt] = useState(false);

  const welcomeText = () => {
    const firstName = _.get(profile, 'user.firstName', '');
    const lastName = _.get(profile, 'user.lastName', '');
    return (
        <div className='patient-section-container'>
          <h1 className='patient-section-container-text'>
            {`Welcome Dr. ${firstName}, ${lastName}`}.
          </h1>
        </div>
    );
  }
  const upcomingAppointmentsSnapshot = () => {
    const currentDate = moment(new Date()).format('YYYY-DD-MM');
    const upcomingAppointments = _.get(profile, 'upcomingAppointments', []);
    let uniqueArr = [];
    if (upcomingAppointments.length > 0) {
      const kvArray = upcomingAppointments.map(entry => {
        const key = ['apptDate', 'startTime', 'doctorEmail'].map(k => entry[k]).join('|');
        return [key, entry];
       });
       const map = new Map(kvArray);
       uniqueArr = Array.from(map.values());

       uniqueArr.sort((a,b) => -(`${a.apptDate}T${TimeConfig[a.startTime]}`).localeCompare(`${b.apptDate}T${TimeConfig[b.startTime]}`));
       setUniqueApptArr(uniqueArr);
    }
    return (
        <div
          className='patient-section-container'
          onClick={() => setUpcomingAppt(true)}
          >
          <div className='patient-upcoming-appointments'>
            <CalendarMonthIcon
              sx={{ fontSize: 200, color: "#07234B", padding: "0 10px" }} //0078bf
            />
            <h4 className='patient-section-container-text'>
              Upcoming appointments
            </h4>
            <div className='patient-upcoming-appointments-list'>
              {uniqueArr.length > 0 &&
              uniqueArr[0].apptDate >= currentDate ?
              `You're latest appointment is with 
              ${uniqueArr[0].userFirstName} ${uniqueArr[0].userLastName} on ${uniqueArr[0].apptDate} at ${uniqueArr[0].startTime}` :
              'You not have any upcoming appointments'}
            </div>
          </div>
        </div>
    );
  }
  const profileSnapshot = () => {
    return (
          <Link className='patient-section-container' to='/doctor-home/profile'>
            <div className='patient-section-container'>
              <div className='patient-upcoming-appointments'>
                <PersonIcon
                  sx={{ fontSize: 200, color: "#07234B", padding: "0 10px" }} //0078bf
                />
                <h4 className='patient-section-container-text'>
                  Profile
                </h4>
              </div>
            </div>
          </Link>
    );
  }
  const patientSearch = () => {
    return (
      <Link className='patient-section-container' to='/doctor-home/patient-search'>
        <div className='patient-section-container'>
          <div className='patient-upcoming-appointments'>
            <PersonIcon
              sx={{ fontSize: 200, color: "#07234B", padding: "0 10px" }} //0078bf
            />
            <h4 className='patient-section-container-text'>
              Patient Search
            </h4>
          </div>
        </div>
      </Link>
    )
  }
  if (loading) {
    return (
      <div className="lds-ring">Loading<div></div><div></div><div></div><div></div></div>
    );
  }
  return (
    <>
      {upcomingApptNav && <Navigate to='/upcoming-appointment' state={{profile}}/>}
      <Header
        profilePage
        isLoggedIn={props.isLoggedIn}
        signOut={signOut}
      />
      <div className='patient-section'>
        {welcomeText()}
        <div className='patient-section-tabs'>
        {upcomingAppointmentsSnapshot()}
        {profileSnapshot()}
        {patientSearch()}
        </div>
      </div>
    </>
  )
}

export default DoctorHome;
