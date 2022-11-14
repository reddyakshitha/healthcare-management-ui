import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {Navigate} from 'react-router-dom'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from "react-router-dom";
import Header from '../Header/header';
import './speciality.scss';

const SpecialityLookup = props => {

  const {
    allDoctors,
    loading,
    isLoggedIn,
    getAllDoctors
  } = props;

  const location = useLocation();
  const {state} = location;
  const {
    section,
    specialityArr,
    loc,
    email,
    firstName,
    lastName,
    speciality,
    education
  } = state;
  useEffect(() => {
      getAllDoctors()
  }, []);

  const [appointmentPage, setAppointmenmtPage] = useState(false);

  if (loading) {
    return (
      <div className="lds-ring">Loading<div></div><div></div><div></div><div></div></div>
    );
  }

  const handleAppointment = () => {
    setAppointmenmtPage(true);
  }
  const specialityList = (specialityArr || []).map((item, i) => {
    let edu = item.education.join(', ');
    return (
      <div className='doctor-card-container' key={i}>
        <div className='doctor-image-container'>  
          <AccountCircleIcon
              sx={{ fontSize: 100, color: "#07234B", padding: "0 10px" }} //0078bf
            />
          <button
            disabled={isLoggedIn ? false : true}
            onClick={handleAppointment}
            className={isLoggedIn ? 'doctor-view-details' : 'doctor-view-details-disabled'}>
              {isLoggedIn ? 'Book a consultation' : 'Login to book'}
          </button>
        </div>
        <div className='doctor-name-container'>
          Dr. {item.user.firstName} {item.user.lastName}
        </div>
        <div className='doctor-name-container'>
          Education: {edu}
        </div>
        <div className='doctor-name-container'>
          Speciality: {item.speciality.charAt(0).toUpperCase() + item.speciality.slice(1)}
        </div>
        <div className='doctor-name-container'>
          Contact: {item.user.email}
        </div>
        <div className='doctor-name-container'>
          About: Dr. {item.user.firstName} {item.user.lastName} is a {item.speciality}, and is affiliated with HMS, and has been in practice for more tha 10+ years.
        </div>
      </div>
    )
  });
  const doctorList = () => {
    return (
      <div className='doctor-card-container'>
        <div className='doctor-image-container'>  
          <AccountCircleIcon
              sx={{ fontSize: 100, color: "#07234B", padding: "0 10px" }} //0078bf
            />
          <button
            onClick={handleAppointment}
            disabled={isLoggedIn ? false : true}
            className={isLoggedIn ? 'doctor-view-details' : 'doctor-view-details-disabled'}>
              {isLoggedIn ? 'Book a consultation' : 'Login to book'}
          </button>
        </div>
        <div className='doctor-name-container'>
          Dr. {firstName} {lastName}
        </div>
        <div className='doctor-name-container'>
          Education: {education}
        </div>
        <div className='doctor-name-container'>
          Speciality: {speciality.charAt(0).toUpperCase() + speciality.slice(1)}
        </div>
        <div className='doctor-name-container'>
          Contact: {email}
        </div>
        <div className='doctor-name-container'>
          About: Dr. {firstName} {lastName} is a {speciality}, and is affiliated with HMS, and has been in practice for more tha 10+ years.
        </div>
      </div>
    )
  };
  return (
    <div className="healthcare-app">
      {appointmentPage && <Navigate to="/book-appointment" state={state}/>}
      <Header
        isLoggedIn={props.isLoggedIn}
        profile={props.profile}
      />
      <h1 className='speciality-Header'>
        Speciality: {loc === 'speciality' ? section.toUpperCase() : speciality.toUpperCase()}
      </h1>
      {loc === 'speciality' && <div className='speciality-list'>
        {specialityList}
      </div>}
      {loc === 'doctor' && <div className='speciality-list single-doctor-search'>
        {doctorList()}
      </div>}
    </div>
  );
}

export default SpecialityLookup;
