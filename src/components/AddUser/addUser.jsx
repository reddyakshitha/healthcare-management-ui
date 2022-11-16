/*eslint-disable  no-unused-expressions */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import Search from '../Search/search';
import './addUser.scss';
import { Password } from '@mui/icons-material';

const AddUser = props => {
  const {
    errors,
    profile,
    isLoggedIn,
    loadLoggedinUser,
    updateInfo,
    signOut,
    adminregisterUsers,
    adminRegisteredUserTokens,
    registrationDoctorSuccess,
    registrationDoctorError,
    doctorSuccess,
    doctorErr,
    updateInfoSuccessfull,
    profileUpdateSuccess,
    loading,
    getAllDoctors,
    allDoctors
  } = props;

  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    password: '',
    credentials: false,
    speciality: '',
    education: ''
  });
  const {
    password,
    firstName,
    lastName,
    email,
    dob,
    gender,
    credentials,
    speciality,
    education
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
      payload.gender = gender,
      payload.education = education
      updateInfo(payload, adminRegisteredUserTokens);
      setPersonalData({...personalData, credentials: false});
    } else if (section === 'cred') {
      payload.firstName = firstName,
      payload.lastName = lastName,
      payload.email = email,
      payload.password = password,
      payload.isDoctor = true
      adminregisterUsers(payload);
      setPersonalData({...personalData, credentials: true});
    }
  }
  const patientDetails = () => {
    return (
      <>
        <div className='patient-id-container'>
          <label htmlFor="speciality"> Speciality</label>
          <select name="speciality" value={speciality} onChange={(e) => onChange(e)}>
            <option value="" disabled selected>Select</option>
            <option value="cardiologist">Cardiologist</option>
            <option value="dentist">Dentist</option>
            <option value="dermatologist">Dermatologist</option>
            <option value="generalSurgeon">General Surgeon</option>
            <option value="neurologist">Neurologist</option>
            <option value="oncologist">Oncologist</option>
            <option value="ophthalmologist">Ophthalmologist</option>
            <option value="pediatrician">Pediatrician</option>
            <option value="primaryCarePhysician">Primary Care Physician-PCP</option>
            <option value="radiologist">Radiologist</option>
          </select>
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Education</label>
          <input
            type="string"
            name="education"
            value={education}
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
            <option value="" disabled selected>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
          <button
            className={`${!credentials || _.get(props, 'errors', []).length > 0 ? 'btn-disabled' : 'update-personal-info '}`}
            disabled={!credentials || _.get(props, 'errors', []).length > 0}
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
          {profileUpdateSuccess && 
                toast(`Profile successfully Updated`, {
                  toastId: 'docProfSuccess',
                  onClose: () => {
                    updateInfoSuccessfull(false);
                  }, autoClose: 3000
                })}
        </div>
    );
  }
  const doctorCredentials = () => {
    const errorsMap = () => {
      if (errors.length > 0) {
        const errContainer = errors.map((item, i) => {
          return (
            <div className='error' key={i}>
              {item.msg}
            </div>
          );
        });
        return errContainer
      }
    }
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-personal-information'>
            Add Doctor Credentials
          </h1>
          {doctorLoginCred()}
          {registrationDoctorSuccess && 
                toast(`Credentials added successfully`, {
                  toastId: 'docRegSuccess',
                  onClose: () => {
                    doctorSuccess(false);
                  }, autoClose: 3000
                })}
          {registrationDoctorError && 
          <div className="healthcare-signup-errors">
            {_.get(props, 'errors', []).length > 0 && errorsMap()}
          </div>}
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
        isLoggedIn={props.isLoggedIn}
        signOut={signOut}
        profile={props.profile}
        />
      <ToastContainer limit={1} autoClose={5000}/>
      <div className='patient-profile-section'>
        {doctorCredentials()}
        {personalInformation()}
      </div>
    </>
  )
}

export default AddUser;
