/*eslint-disable  no-unused-expressions */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import Header from '../Header/header';
import { HourConfig } from '../UpComingAppt/hourConfig';
import { TimeConfig } from '../DoctorHome/timeConfig';
import './patientSearch.scss';

const PatientSearch = props => {
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

  const isPatient = _.get(adminViewData, 'user.isPatient', false);

  const [personalData, setPersonalData] = useState({
    userEmail: ''
  });
  const {
    userEmail
  } = personalData;

  const onChange = e => {
    setPersonalData({...personalData, [e.target.name]: e.target.value});
  }
  const getInfo = () => {
    getUserData(userEmail);
  }

  const getPatientDetails = () => {
    return (
    <>
      <div className='patient-id-container'>
        <label className='patient-id-label'>Date of Birth</label>
        <input
          disabled
          type="date"
          name="dob"
          value={moment(adminViewData.dob).utc().format('YYYY-DD-MM')}
        />
      </div>
      <div className='patient-id-container'>
        <label className='patient-id-label'>Gender</label>
        <input
          disabled
          type="input"
          name="gender"
          value={_.get(adminViewData, 'gender', '')}
        />
      </div>
      <div className='patient-medhis'>
      <h1 className='patient-personal-information-header'>
        Medical History
      </h1>
      <div className='patient-id-container'>
        <textarea
          name="medHis"
          value={_.get(adminViewData, 'medicalHistory', '')}
        />
      </div>

      </div>
    </>
    )
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
              Get Patient Data
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
            View Patient Data
          </h1>
          {userDetails()}
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
      <div className='patient-profile-search-container'>
      <div className='patient-profile-section'>
        {viewEdit()}
      </div>
      {_.get(adminViewData, 'user.email', '') === userEmail && userEmail !== '' &&  <div className='patient-profile-section-data'>
        {getPatientDetails()}
      </div>}
      </div>
    </>
  )
}

export default PatientSearch;
