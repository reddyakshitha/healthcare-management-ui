/*eslint-disable  no-unused-expressions */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import Search from '../Search/search';
import './addUser.scss';
import { Password } from '@mui/icons-material';

const AddUser = props => {
  const {
    profile,
    isLoggedIn,
    loadLoggedinUser,
    updateInfo,
    signOut
  } = props;

  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    password: '',
    credentials: false,
    speciality: ''
  });
  const {
    password,
    firstName,
    lastName,
    email,
    dob,
    gender,
    credentials,
    speciality
  } = personalData;

  const onChange = e => {
    setPersonalData({...personalData, [e.target.name]: e.target.value});
  }
  const update = section => {
    let payload = {};
    const token = localStorage.getItem('token');
    if (section === 'info') {
      payload.dob = dob,
      payload.speciality = speciality,
      payload.gender = gender
      updateInfo(payload, token);
    } else if (section === 'cred') {
      payload.firstName = firstName,
      payload.lastName = lastName,
      payload.email = email,
      payload.password = password
      updateInfo(payload, token);
      setPersonalData({...personalData, credentials: true});
    }
  }
  const patientDetails = () => {
    return (
      <>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Speciality</label>
          <input
            type="string"
            name="speciality"
            value={speciality}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
        <label htmlFor="gender"> Gender</label>
          <select name="gender" value={gender} onChange={(e) => onChange(e)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
          <button
            className={`${!credentials ? 'btn-disabled' : 'update-personal-info '}`}
            onClick={() => update('info')}
          >
            Add Doctor Profile
          </button>
        </div>
      </>
    )
  }

  const doctorLoginCred = () => {
    return (
      <>
        <div className='patient-id-container'>
          <div className='patient-id-container'>
            <label className='patient-id-label'>First Name</label>
            <input
              type="string"
              name="firstName"
              value={firstName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='patient-id-container'>
            <label className='patient-id-label'>Last Name</label>
            <input
              type="string"
              name="lastName"
              value={lastName}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='patient-id-container'>
            <label className='patient-id-label'>Email</label>
            <input
              type="string"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='patient-id-container'>
            <label className='patient-id-label'>password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <button
              disabled={email === '' && password === ''}
              className={`${email === '' && password === '' ? 'btn-disabled' : 'update-personal-info '}`}
              onClick={() => update('cred')}
            >
              Add Doctor Credentials
            </button>
          </div>
        </div>
      </>
    )
  }
  const personalInformation = () => {
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-personal-information'>
            Add Doctor Profile
          </h1>
          {patientDetails()}
        </div>
    );
  }
  const doctorCredentials = () => {
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-personal-information'>
            Add Doctor Credentials
          </h1>
          {doctorLoginCred()}
        </div>
    );

  }
  
  return (
    <>
      <Header
        profilePage
        signOut={signOut}
        />
      <Search />
      <div className='patient-profile-section'>
        {doctorCredentials()}
        {personalInformation()}
      </div>
    </>
  )
}

export default AddUser;
