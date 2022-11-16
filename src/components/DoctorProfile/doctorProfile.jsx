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
import './doctorProfile.scss';
import { Password } from '@mui/icons-material';

const DoctorProfile = props => {
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
  useEffect(() => {
    const token = localStorage.getItem('token');
    loadLoggedinUser(token);
  }, [!isLoggedIn]);

  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    password: '',
    credentials: false,
    speciality: '',
    education: '',
    updatePersInfo: false,
    updateMedHis: false
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
    education,
    updatePersInfo,
    updateMedHis
  } = personalData;

  const onChange = e => {
    if (profileUpdateSuccess) {
      updateInfoSuccessfull(false);
    }
    setPersonalData({...personalData, [e.target.name]: e.target.value});
  }
  const update = section => {
    let payload = {};
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (section === 'info') {
      payload.dob = dob !== '' ? dob : moment(_.get(profile, 'dob', new Date())).utc().format('YYYY-DD-MM'),
      payload.speciality = speciality !== '' ? speciality : _.get(profile, 'speciality', ''),
      payload.gender = gender !== '' ? gender : _.get(profile, 'gender', ''),
      payload.education = education !== '' ? education : _.get(profile, 'education', [])
      updateInfo(payload, token);
      setPersonalData({...personalData, updateMedHis: true});
    } else if (section === 'cred') {
      payload.firstName = firstName !== '' ? firstName : _.get(profile, 'user.firstName', ''),
      payload.lastName = lastName !== '' ? lastName : _.get(profile, 'user.lastName', ''),
      payload.email = _.get(profile, 'user.email', ''),
      payload.isDoctor = true
      updateInfo(payload, token);
      setPersonalData({...personalData, updatePersInfo: true});
    }
  }
  const patientDetails = () => {
    return (
      <>
        <div className='patient-id-container'>
          <label htmlFor="speciality"> Speciality</label>
          <select name="speciality" value={speciality !== '' ? speciality : _.get(profile, 'speciality', '')} onChange={(e) => onChange(e)}>
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
            value={education !== '' ? education : _.get(profile, 'education', [])}
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
            <option value="" disabled selected>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
          <button
            className='update-personal-info '
            onClick={() => update('info')}
          >
            Update
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
              type="string"
              disabled
              name="email"
              value={_.get(profile, 'user.email', '')}
              onChange={(e) => onChange(e)}
            />
            <button
              className='update-personal-info'
              onClick={() => update('cred')}
            >
              Update
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
            Doctor Profile
          </h1>
          {patientDetails()}
        {profileUpdateSuccess && updateMedHis && 
                toast(`Doctor Profile updated sucessfully.`, {
                  toastId: 'docmedProfileSuccess',
                  onClose: () => {
                    if (profileUpdateSuccess) {
                    setPersonalData({...personalData, updateMedHis: false});
                    }
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
            Doctor Personal Information
          </h1>
          {doctorLoginCred()}
        {profileUpdateSuccess && updatePersInfo && 
            toast(`Doctor's personal information updated sucessfully.`, {
              toastId: 'doctorpersonalHisInfoSuccess',
              onClose: () => {
                if (profileUpdateSuccess) {
                setPersonalData({...personalData, updatePersInfo: false});
                }
              }, autoClose: 3000
            })}
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

export default DoctorProfile;
