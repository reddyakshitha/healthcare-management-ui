/*eslint-disable  no-unused-expressions */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import Search from '../Search/search';
import './addComments.scss';
import { Password } from '@mui/icons-material';

const AddComments = props => {
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
    updateComments,
    commentsUpdated,
    commentSuccess
  } = props;

  const isDoctor = _.get(profile, 'user.isDoctor', false);
  const location = useLocation();
  const {state} = location;
  const [personalData, setPersonalData] = useState({
    addComments: _.get(state, 'consultationComments', ''),
    addPrescriptions: _.get(state, 'prescriptions', ''),
  });
  const {
    addComments,
    addPrescriptions,
  } = personalData;

  const onChange = e => {
    setPersonalData({...personalData, [e.target.name]: e.target.value});
  }
  const update = () => {
    let payload = {
    };
    payload.apptDate = state.apptDate,
    payload.doctorEmail = state.doctorEmail,
    payload.doctorFirstName = state.doctorFirstName,
    payload.doctorLastName = state.doctorLastName,
    payload.endTime = state.endTime,
    payload.startTime = state.startTime,
    payload.userEmail = state.userEmail,
    payload.userFirstName = state.userFirstName,
    payload.userLastName = state.userLastName,
    payload.consultationComments = addComments,
    payload.prescriptions = addPrescriptions

    updateComments(payload);
  }
  const AddComments = () => {
    return (
      <>
        <div className='patient-id-container'>
          <div className='patient-id-container'>
            <label className='patient-id-label'>Consultation comments</label>
            <textarea
              type="string"
              disabled={!isDoctor || (isDoctor && _.get(state, 'consultationComments', '') !== '')}
              name="addComments"
              value={addComments}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='patient-id-container'>
            <label className='patient-id-label'>Prescriptions</label>
            <textarea
              type="string"
              name="addPrescriptions"
              disabled={!isDoctor || (isDoctor && _.get(state, 'prescriptions', '') !== '')}
              value={addPrescriptions}
              onChange={(e) => onChange(e)}
            />
          </div>
            {isDoctor && <button
              disabled={commentSuccess || _.get(state, 'consultationComments', '') !== '' || addComments === '' || addPrescriptions === '' || _.get(state, 'prescriptions', '') !== ''}
              className={`${commentSuccess || _.get(state, 'consultationComments', '') !== '' || addComments === '' || addPrescriptions === '' || _.get(state, 'prescriptions', '') !== '' ? 'btn-disabled' : 'update-personal-info '}`}
              onClick={() => update()}
            >
              Update
            </button>}
        </div>
      </>
    )
  }
  const addCommentsAndPrescriptions = () => {
    return (
        <div className='patient-profile-section-container'>
          <h1 className='patient-personal-information'>
            {isDoctor ? 'Add Comments and Prescriptions' : 'Comments and Prescriptions'}
          </h1>
          {AddComments()}
          {commentSuccess && 
                toast(`Consultation comments and prescriptions added successfully. You will now be redirected to appointment page`, {
                  toastId: 'commentsSuccess',
                  onClose: () => {
                    commentsUpdated(false);
                    setTimeout(function() {
                      window.location.replace('/upcoming-appointment');
                  }, 5000);
                  },
                  autoClose: 3000
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
        {addCommentsAndPrescriptions()}
      </div>
    </>
  )
}

export default AddComments;
