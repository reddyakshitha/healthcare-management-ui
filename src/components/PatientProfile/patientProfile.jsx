/*eslint-disable  no-unused-expressions */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import Search from '../Search/search';
import { patientConfig } from '../../config/patientConfig';
import './patientProfile.scss';

const PatientProfile = props => {
  const {
    profile,
    isLoggedIn,
    loadLoggedinUser,
    updateInfo
  } = props;
  useEffect(() => {
    const token = localStorage.getItem('token');
    loadLoggedinUser(token);
  }, [!isLoggedIn]);

  const [personalData, setPersonalData] = useState({
    patientId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    medHis: ''
  });
  const {
    _id,
    firstName,
    lastName,
    email,
    dob,
    gender,
    medHis
  } = personalData;

  const onChange = e => {
    setPersonalData({...personalData, [e.target.name]: e.target.value});
  }
  const update = section => {
    let payload = {};
    const token = localStorage.getItem('token');
    if (section === 'info') {
      payload.firstName = (firstName !== '' ? firstName : _.get(profile, 'user.firstName', '')),
      payload.lastName = lastName !== '' ? lastName : _.get(profile, 'user.lastName', ''),
      payload.dob = dob !== '' ? dob : moment(profile.dob).utc().format('YYYY-DD-MM'),
      payload.gender = gender !== '' ? gender : _.get(profile, 'gender', '')
      updateInfo(payload, token);
    } else if (section === 'medHis') {
      payload.medicalHistory = medHis !== '' ? medHis : _.get(profile, 'medicalHistory', '')
      updateInfo(payload, token);
    }
  }
  const patientDetails = () => {
    return (
      <>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Patient ID</label>
          <input disabled type="string" name="patientId" value={_.get(profile, 'user._id', '')}/>
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>First Name</label>
          <input
            type="string"
            name="firstName"
            value={firstName !== '' ? firstName : _.get(profile, 'user.firstName', '')}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Last Name</label>
          <input
            type="string"
            name="lastName"
            value={lastName !== '' ? lastName : _.get(profile, 'user.lastName', '')}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Email</label>
          <input
            disabled
            type="string"
            name="email"
            value={email !== '' ? email : _.get(profile, 'user.email', '')}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={dob !== '' ? dob : moment(profile.dob).utc().format('YYYY-DD-MM')}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
        <label htmlFor="gender"> Gender</label>
          <select name="gender" value={gender !== '' ? gender : _.get(profile, 'gender', '')} onChange={(e) => onChange(e)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
          <button
            className='update-personal-info'
            onClick={() => update('info')}
          >
            Update
          </button>
        </div>
      </>
    )
  }
  const personalInformation = () => {
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-personal-information'>
            Personal Information
          </h1>
          {patientDetails()}
        </div>
    );
  }
  const medicalHistory = () => {
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-personal-information'>
            Medical History
          </h1>
          <div className='patient-id-container'>
            <textarea
              name="medHis"
              value={medHis !== '' ? medHis : _.get(profile, 'medicalHistory', '')}
              onChange={(e) => onChange(e)}
            />
            <button
              className='update-personal-info'
              onClick={() => update('medHis')}
            >
              Update
            </button>
          </div>
        </div>
    );
  }
  const prescriptions = () => {
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-personal-information'>
            Prescriptions
          </h1>
        </div>
    );
  }
  
  return (
    <>
      <Header profilePage/>
      <Search />
      <div className='patient-profile-section'>
        {personalInformation()}
        {medicalHistory()}
        {prescriptions()}
      </div>
    </>
  )
}

export default PatientProfile;