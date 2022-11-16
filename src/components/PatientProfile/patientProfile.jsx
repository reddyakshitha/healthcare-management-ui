/*eslint-disable  no-unused-expressions */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import Search from '../Search/search';
import './patientProfile.scss';

const PatientProfile = props => {
  const {
    profile,
    isLoggedIn,
    loadLoggedinUser,
    updateInfo,
    signOut,
    profileUpdateSuccess,
    updateInfoSuccessfull,
    loading,
    getAllDoctors,
    allDoctors
  } = props;

  useEffect(() => {
    getAllDoctors()
}, []);
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
    medHis: '',
    updatePersInfo: false,
    updateMedHis: false
  });
  const {
    _id,
    firstName,
    lastName,
    email,
    dob,
    gender,
    medHis,
    updatePersInfo,
    updateMedHis
  } = personalData;

  const onChange = e => {
    if (profileUpdateSuccess) {
      updateInfoSuccessfull(false);
    }
    setPersonalData({...personalData, [e.target.name]: e.target.value, updatePersInfo: false, updateMedHis: false});
  }
  const update = section => {
    let payload = {};
    const token = localStorage.getItem('token');
    if (section === 'info') {
      payload.firstName = (firstName !== '' ? firstName : _.get(profile, 'user.firstName', '')),
      payload.lastName = lastName !== '' ? lastName : _.get(profile, 'user.lastName', ''),
      payload.dob = dob !== '' ? dob : moment(_.get(profile, 'dob', new Date())).utc().format('YYYY-DD-MM'),
      payload.gender = gender !== '' ? gender : _.get(profile, 'gender', '')
      updateInfo(payload, token);
    setPersonalData({...personalData, updatePersInfo: true});
    } else if (section === 'medHis') {
      payload.medicalHistory = medHis !== '' ? medHis : _.get(profile, 'medicalHistory', '')
      updateInfo(payload, token);
      setPersonalData({...personalData, updateMedHis: true});
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
            <option value="" disabled selected>Select</option>
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
        {profileUpdateSuccess && updatePersInfo && 
            toast(`Patient's personal information updated sucessfully.`, {
              toastId: 'personalHisSuccess',
              onClose: () => {
                if (profileUpdateSuccess) {
                setPersonalData({...personalData, updatePersInfo: false});
                }
              }, autoClose: 3000
            })}
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
            {profileUpdateSuccess && updateMedHis && 
                toast(`Patient's medical history updated sucessfully.`, {
                  toastId: 'medHisSuccess',
                  onClose: () => {
                    if (profileUpdateSuccess) {
                    setPersonalData({...personalData, updateMedHis: false});
                    }
                  }, autoClose: 3000
                })}
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
        isLoggedIn={props.isLoggedIn}
        signOut={signOut}
        profile={props.profile}
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
      {loading && <div className="lds-ring">Loading<div></div><div></div><div></div><div></div></div>}
      {!loading && <div className='patient-profile-section'>
        {personalInformation()}
        {medicalHistory()}
        <ToastContainer limit={1} autoClose={5000}/>
      </div>}
    </>
  )
}

export default PatientProfile;
