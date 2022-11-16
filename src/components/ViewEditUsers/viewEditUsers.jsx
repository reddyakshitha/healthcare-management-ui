/*eslint-disable  no-unused-expressions */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import Header from '../Header/header';
import './viewEditUsers.scss';

const ViewEditUsers = props => {
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
    allDoctors,
    revokeUserCredentials,
    setUserDeleted,
    userDelete,
    noUserExist,
    noUserToDelete,
    getUserData,
    adminViewData,
    updateInfoWithoutToken
  } = props;

  const [personalData, setPersonalData] = useState({
    userEmail: '',
    userFirstName: '',
    userLastName: '',
    userDob: '',
    userGender: '',
    userMedHis: '',
  });
  const {
    userEmail,
    userFirstName,
    userLastName,
    userDob,
    userGender,
    userMedHis,
  } = personalData;

  const onChange = e => {
    setPersonalData({...personalData, [e.target.name]: e.target.value});
  }
  const getInfo = () => {
    getUserData(userEmail);
  }

  const userDetails = () => {
    return (
      <>
        <div className='patient-id-container'>
          <div className='patient-id-container'>
            <label className='patient-id-label'>Enter User's Email</label>
            <input
              type="string"
              name="userEmail"
              value={userEmail}
              onChange={(e) => onChange(e)}
            />
            <button
              disabled={userEmail === ''}
              className={`${userEmail === '' ? 'btn-disabled' : 'update-personal-info '}`}
              onClick={() => getInfo()}
            >
              Get User Information
            </button>
          </div>
        </div>
      </>
    )
  }
  const viewEdit = () => {
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-personal-information'>
            View/Edit User Information
          </h1>
          {userDetails()}
          {profileUpdateSuccess && 
                toast(`Details updated successfully`, {
                  toastId: 'userDetailsUpdateSuccess',
                  onClose: () => {
                    updateInfoSuccessfull(false);
                  }, autoClose: 5000
                })}
        </div>
    );
  }

  const update = section => {
    let payload = {};
    if (section === 'patient') {
      payload.firstName = (userFirstName !== '' ? userFirstName : _.get(adminViewData, 'user.firstName', '')),
      payload.lastName = userLastName !== '' ? userLastName : _.get(adminViewData, 'user.lastName', ''),
      payload.dob = userDob !== '' ? userDob : moment(adminViewData.dob).utc().format('YYYY-DD-MM'),
      payload.gender = userGender !== '' ? userGender : _.get(adminViewData, 'gender', ''),
      payload.userEmail = userEmail !== '' ? userEmail : _.get(adminViewData, 'user.email', ''),
      payload.section = section
      updateInfoWithoutToken(payload);
    setPersonalData({...personalData, updatePersInfo: true});
    } else if (section === 'medHis') {
      // payload.medicalHistory = medHis !== '' ? medHis : _.get(profile, 'medicalHistory', '')
      // updateInfo(payload, token);
      // setPersonalData({...personalData, updateMedHis: true});
    }
  }
  const patientDetails = () => {
    return (
      <>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Patient ID</label>
          <input disabled type="string" name="patientId" value={_.get(adminViewData, 'user._id', '')}/>
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>First Name</label>
          <input
            type="string"
            name="userFirstName"
            value={userFirstName !== '' ? userFirstName : _.get(adminViewData, 'user.firstName', '')}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Last Name</label>
          <input
            type="string"
            name="userLastName"
            value={userLastName !== '' ? userLastName : _.get(adminViewData, 'user.lastName', '')}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Email</label>
          <input
            disabled
            type="string"
            name="userEmail"
            value={userEmail !== '' ? userEmail : _.get(adminViewData, 'user.email', '')}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
          <label className='patient-id-label'>Date of Birth</label>
          <input
            type="date"
            name="userDob"
            value={userDob !== '' ? userDob : moment(adminViewData.dob).utc().format('YYYY-DD-MM')}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='patient-id-container'>
        <label htmlFor="userGender"> Gender</label>
          <select name="userGender" value={userGender !== '' ? userGender : _.get(adminViewData, 'gender', '')} onChange={(e) => onChange(e)}>
            <option value="" disabled selected>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">other</option>
          </select>
          <button
            className='update-personal-info'
            onClick={() => update('patient')}
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
            Patient Information
          </h1>
          {patientDetails()}
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
        {viewEdit()}
        {_.get(adminViewData, 'user.email', '') === userEmail &&
        _.get(adminViewData, 'user.isPatient', false) &&
        userEmail !== '' &&
        personalInformation()}
      </div>
    </>
  )
}

export default ViewEditUsers;
