/*eslint-disable  no-unused-expressions */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import Header from '../Header/header';
import './removeUser.scss';

const RemoveUser = props => {
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
    noUserToDelete
  } = props;

  const [personalData, setPersonalData] = useState({
    email: ''
  });
  const {
    email,
  } = personalData;

  const onChange = e => {
    setPersonalData({...personalData, [e.target.name]: e.target.value});
  }
  const revoke = () => {
    revokeUserCredentials(email);
  }

  const loginCred = () => {
    return (
      <>
        <div className='patient-id-container'>
          <div className='patient-id-container'>
            <label className='patient-id-label'>Enter User's Email</label>
            <input
              type="string"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <button
              disabled={email === ''}
              className={`${email === '' ? 'btn-disabled' : 'update-personal-info '}`}
              onClick={() => revoke()}
            >
              Revoke Credentials
            </button>
          </div>
        </div>
      </>
    )
  }
  const revokeCredentials = () => {
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
            Revoke Credentials
          </h1>
          {loginCred()}
          {userDelete && 
                toast(`User deleted successfully`, {
                  toastId: 'userDeleteSuccess',
                  onClose: () => {
                    setUserDeleted(false);
                  }, autoClose: 3000
                })}
          {noUserExist &&
          toast(`No Such User Exist`, {
            toastId: 'userDeleteSuccess',
            onClose: () => {
              noUserToDelete(false);
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
        {revokeCredentials()}
      </div>
    </>
  )
}

export default RemoveUser;
