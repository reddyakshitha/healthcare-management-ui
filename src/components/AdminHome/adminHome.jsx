import React, {useLayoutEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from '../Header/header';
import Search from '../Search/search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


import './adminHome.scss';

const AdminHome = props => {
  const {
    errors,
    isLoggedIn,
    loadLoggedinUser,
    profile,
    signOut,
    loading,
    getAllDoctors
  } = props;

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    loadLoggedinUser(token);
  }, [!isLoggedIn]);

  const welcomeText = () => {
    const firstName = _.get(profile, 'user.firstName', '');
    const lastName = _.get(profile, 'user.lastName', '');
    return (
        <div className='patient-section-container'>
          <h1 className='patient-section-container-text'>
            {`Welcome ${firstName}, ${lastName}`}.
          </h1>
        </div>
    );
  }
  const upcomingAppointmentsSnapshot = () => {
    return (
      <Link className='patient-section-container' to='/admin-home/addUser'>
        <div className='patient-section-container'>
          <div className='patient-upcoming-appointments'>
            <PersonAddIcon
              sx={{ fontSize: 200, color: "#07234B", padding: "0 10px" }} //0078bf
            />
            <h4 className='patient-section-container-text'>
              Add User
            </h4>
          </div>
        </div>
      </Link>
    );
  }
  const profileSnapshot = () => {
    return (
          <Link className='patient-section-container' to='/admin-home/profile'>
            <div className='patient-section-container'>
              <div className='patient-upcoming-appointments'>
                <PersonRemoveIcon
                  sx={{ fontSize: 200, color: "#07234B", padding: "0 10px" }} //0078bf
                />
                <h4 className='patient-section-container-text'>
                  Revoke Access
                </h4>
              </div>
            </div>
          </Link>
    );
  }
  return (
    <>
      <Header
        profilePage
        signOut={signOut}
      />
      <Search
        getAllDoctors={getAllDoctors}
        loading={loading}
      />
      <div className='patient-section'>
        {welcomeText()}
        <div className='patient-section-tabs'>
        {upcomingAppointmentsSnapshot()}
        {profileSnapshot()}
        </div>
      </div>
    </>
  )
}

export default AdminHome;
