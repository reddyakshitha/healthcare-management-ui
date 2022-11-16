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
import './viewDoctorAppt.scss';

const ViewDoctorAppt = props => {
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

  const [noAppt, showNoAppt] = useState(false);

  const isDoctor = _.get(adminViewData, 'user.isDoctor', false);
  const apptWithCommentsArr = _.get(adminViewData, 'appointmnetsWithComments', []);

  const currentDateTime = moment.utc(new Date()).local().format("L LT");
  const currentDate = currentDateTime.substring(0, 10).replace(/(..).(..).(....)/, "$3-$2-$1");
  const currentHour = currentDateTime.substring(10).replace(/\s+/g, '');
  const currentHourSplit = currentHour.split(':');
  const currentHourAMPM = currentHour.slice('-2');
  const currentHourJoined = currentHourSplit[0]+currentHourAMPM;
  const currentHourConfigMapped = HourConfig[currentHourJoined];


  const upcomingAppointments = _.get(adminViewData, 'upcomingAppointments', []);
  let uniqueArr = [];
  if (upcomingAppointments.length > 0) {
    const kvArray = upcomingAppointments.map(entry => {
      const key = ['apptDate', 'startTime', 'doctorEmail'].map(k => entry[k]).join('|');
      return [key, entry];
     });
     const map = new Map(kvArray);
     uniqueArr = Array.from(map.values());

     uniqueArr.sort((a,b) => -(`${a.apptDate}T${TimeConfig[a.startTime]}`).localeCompare(`${b.apptDate}T${TimeConfig[b.startTime]}`));
    }
  const appointmentArr = uniqueArr;

  const pastApptArr = appointmentArr.filter(item => {
    if (currentDate > item.apptDate) {
      return item;
    } else if (currentDate === item.apptDate) {
      if (currentHourConfigMapped > HourConfig[item.startTime]) {
        return item;
      }
    }
  });
  const mapCommentsArr = pastApptArr.map(obj =>
    apptWithCommentsArr.find(o => (o.doctorEmail === obj.doctorEmail && o.apptDate === obj.apptDate && o.startTime === obj.startTime)) ||
    obj);
  

  mapCommentsArr.sort((a, b) => a.apptDate > b.apptDate ?
  1 : a.apptDate === b.apptDate ? HourConfig[a.startTime] - HourConfig[b.startTime] : -1);

  const futureApptArr = appointmentArr.filter(item => {
    if (currentDate < item.apptDate) {
      return item;
    } else if (currentDate === item.apptDate) {
      if (currentHourConfigMapped <= HourConfig[item.startTime]) {
        return item;
      }
    }
  });
  futureApptArr.sort((a, b) => a.apptDate > b.apptDate ?
  1 : a.apptDate === b.apptDate ? HourConfig[a.startTime] - HourConfig[b.startTime] : -1);


  const [personalData, setPersonalData] = useState({
    userEmail: ''
  });
  const {
    userEmail
  } = personalData;

  const onChange = e => {
    setPersonalData({...personalData, [e.target.name]: e.target.value});
    showNoAppt(false);
  }
  const getInfo = () => {
    getUserData(userEmail);
    showNoAppt(true);
  }
  const upcoming = () => {
    const futureAppts = futureApptArr.map((item, i) => {
      return (
        <div className={isDoctor ? 'doctor-appt-container' : 'patient-appt-container'} key={i}>
          <div className={isDoctor ? 'doctor-appt-label' : 'patient-appt-label'}>
            Appointment with{` `}   
            {isDoctor ? item.userFirstName : item.doctorFirstName} {isDoctor ? item.userLastName : item.doctorLastName} at{` `}  
            {item.startTime} on {item.apptDate}
          </div>
        </div>
      );
    });
    return (
        <div className='patient-section-container'>
          <h1 className='patient-section-container-text'>
            Upcoming Appointments
          </h1>
          <div>
            {futureAppts}
          </div>
        </div>
    );
  }
  const past = () => {
    const pastAppts = mapCommentsArr.map((item, i) => {
      return (
        <div className={isDoctor ? 'doctor-appt-container' : 'patient-appt-container'}
          key={i}
        >
          <div className={isDoctor ? 'doctor-appt-label' : 'patient-appt-label'}>
            Appointment with{` `}   
            {isDoctor ? item.userFirstName : item.doctorFirstName} {isDoctor ? item.userLastName : item.doctorLastName} at{` `}   
            {item.startTime} on {item.apptDate}
          </div>
        </div>
      );
    });
    return (
      <div className='patient-section-container'>
        <h1 className='patient-section-container-text'>
          Past Appointments
        </h1>
          <div>
            {pastAppts}
          </div>
      </div>
  );
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
              Get Doctor Appointments
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
            View Doctor Appointments
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
      <div className='patient-profile-section'>
        {viewEdit()}
        {_.get(adminViewData, 'user.email', '') === userEmail &&
        _.get(adminViewData, 'user.isDoctor', false) &&
        userEmail !== '' &&
        _.get(adminViewData, 'upcomingAppointments', []).length > 0 ?
         <div className='patient-profile-section-container'>
          {upcoming()}
          {past()}
        </div> : noAppt && <div className='patient-profile-section-container no-appts'>
          No appointments to view at this time.
        </div>}
      </div>
    </>
  )
}

export default ViewDoctorAppt;
