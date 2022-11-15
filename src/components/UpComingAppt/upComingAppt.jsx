import React, {useLayoutEffect, useEffect, useState} from 'react';
import moment from 'moment';
import {Link, Navigate, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { HourConfig } from './hourConfig';
import Header from '../Header/header';
import Search from '../Search/search';


import './upComingAppt.scss';
import { Upcoming } from '@mui/icons-material';

const UpComingAppt = props => {
  const {
    errors,
    isLoggedIn,
    loadLoggedinUser,
    profile,
    signOut,
    loading,
    getAllDoctors,
    allDoctors,
    user
  } = props;

  useEffect(() => {
      getAllDoctors()
      const token = localStorage.getItem('token');
      if (token) {
        loadLoggedinUser(token);
      }
  }, [!isLoggedIn]);

  const location = useLocation();
  const {state} = location;

  const currentDateTime = moment.utc(new Date()).local().format("L LT");
  const currentDate = currentDateTime.substring(0, 10).replace(/(..).(..).(....)/, "$3-$2-$1");
  const currentHour = currentDateTime.substring(10).replace(/\s+/g, '');
  const currentHourSplit = currentHour.split(':');
  const currentHourAMPM = currentHour.slice('-2');
  const currentHourJoined = currentHourSplit[0]+currentHourAMPM;
  const currentHourConfigMapped = HourConfig[currentHourJoined];


  const appointmentArr = _.get(user, 'uniqueApptArr', []);

  const pastApptArr = appointmentArr.filter(item => {
    if (currentDate > item.apptDate) {
      return item;
    } else if (currentDate === item.apptDate) {
      if (currentHourConfigMapped > HourConfig[item.startTime]) {
        return item;
      }
    }
  });
  pastApptArr.sort((a, b) => a.apptDate > b.apptDate ?
  1 : a.apptDate === b.apptDate ? HourConfig[a.startTime] - HourConfig[b.startTime] : -1);
  
  const futureApptArr = appointmentArr.filter(item => {
    if (currentDate < item.apptDate) {
      return item;
    } else if (currentDate === item.apptDate) {
      if (currentHourConfigMapped <= HourConfig[item.startTime]) {
        return item;
      }
    }
  });
  futureApptArr.sort((a, b) => a.apptDate > b.apptDate ?
  1 : a.apptDate === b.apptDate ? HourConfig[a.startTime] - HourConfig[b.startTime] : -1);


  const upcoming = () => {
    const futureAppts = futureApptArr.map((item, i) => {
      return (
        <div className='patient-appt-container' key={i}>
          <div className='patient-appt-label'>
            Appointment with Dr. {item.doctorFirstName} {item.doctorLastName} at {item.startTime} on {item.apptDate}
          </div>
        </div>
      );
    });
    return (
        <div className='patient-section-container'>
          <h1 className='patient-section-container-text'>
            Upcoming Appointments
          </h1>
          <div>
            {futureAppts}
          </div>
        </div>
    );
  }
  const past = () => {
    const pastAppts = pastApptArr.map((item, i) => {
      return (
        <div className='patient-appt-container' key={i}>
          <div className='patient-appt-label'>
            Appointment with Dr. {item.doctorFirstName} {item.doctorLastName} at {item.startTime} on {item.apptDate}
          </div>
        </div>
      );
    });
    return (
      <div className='patient-section-container'>
        <h1 className='patient-section-container-text'>
          Past Appointments
        </h1>
          <div>
            {pastAppts}
          </div>
      </div>
  );
  }
  if (loading) {
    return (
      <div className="lds-ring">Loading<div></div><div></div><div></div><div></div></div>
    );
  }
  return (
    <>
      <Header
        profilePage
        signOut={signOut}
      />
      <Search
        cardiologist={props.cardiologist}
        dentist={props.dentist}
        dermatologist={props.dermatologist}
        generalSurgeon={props.generalSurgeon}
        neurologist={props.neurologist}
        oncologist={props.oncologist}
        ophthalmologist={props.ophthalmologist}
        pediatrician={props.pediatrician}
        primaryCarePhysician={props.primaryCarePhysician}
        radiologist={props.radiologist}
        getAllDoctors={getAllDoctors}
        loading={loading}
        allDoctors={allDoctors}
      />
      <div className='patient-section'>
        {upcoming()}
        {past()}
      </div>
    </>
  )
}

export default UpComingAppt;
