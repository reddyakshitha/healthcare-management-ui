import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import Calendar from 'react-calendar';
import { useLocation } from "react-router-dom";
import Header from '../Header/header';
import { appointmentConfig } from './config';
import 'react-calendar/dist/Calendar.css';

const Appointments = props => {

  const {
    getAllDoctors,
    getDoctorAppointments,
    doctorApptProfile,
    isLoggedIn
  } = props;

  useEffect(() => {
    getAllDoctors();
    if (state.email) {
      getDoctorAppointments(state.email)
    }
  }, []);

  const location = useLocation();
  const {state} = location;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const datVal = moment(tomorrow).format();
  const [value, onChange] = useState(new Date(datVal));
  const [selectedId, setSelectedId] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [proceedPayment, setProceedPayment] = useState(false);

  const handleTimeslot = item => {
    setSelectedId(item.id);
    setSelectedItem(item);
  };

  const handleProceedToCheckout = () => {
    setProceedPayment(true);
  }

  const renderTime = () => {
    let checkUnavailableAppt = [];
    appointmentConfig.map(item => item.isUnavailable = false);

    const appointmentArr = _.get(doctorApptProfile, 'upcomingAppointments', []);

    const selectedDateFormat = moment(value).format('YYYY-DD-MM');
    
    const appointmentArrFilter = appointmentArr.filter(item => item.apptDate === selectedDateFormat);

    if (appointmentArrFilter.length > 0) {
      checkUnavailableAppt = appointmentConfig.map(item => {
        let newItem = item;
        appointmentArrFilter.map(filArr => {
          if (item.startTime === filArr.startTime && item.endTime === filArr.endTime) {
          newItem.isUnavailable = true
        };
        })
        return newItem;
      });

    }

    const availableTimes = (checkUnavailableAppt.length > 0 ? checkUnavailableAppt : appointmentConfig).map((item, i)  => {
      return (
        <button
          className={`appointment-hour-container
          ${item.isUnavailable ? 'appointment-hour-container-disabled' : ''}
          ${i+1 === parseInt(selectedId) ? 'appointment-hour-container-selected' : ''}`}
          key={i}
          disabled={item.isUnavailable}
          onClick={() => handleTimeslot(item)}
        >
          {item.startTime} - {item.endTime}
        </button>
      )
    });
    return availableTimes;
  }
  const navPayload = {
    state,
    timeslot: selectedItem,
    date: value
  }
  console.log('date check', value);
  return (
    <div className="healthcare-app">
      {proceedPayment && <Navigate to='/payment' state={navPayload}/>}
      <Header
        isLoggedIn={props.isLoggedIn}
        profile={props.profile}
      />
      {isLoggedIn ? (
      <>
        <div className='appointment-calander-container'>
        <h1>Book an Appointment</h1>
        <div className='appointment-date-picker'>
          <Calendar
            onChange={onChange}
            value={value}
            minDate={new Date(datVal)}
            defaultValue={new Date(datVal)}
            />
          <div className='appointment-time-picker'>
            {renderTime()}
          </div>
        </div>
      </div>
        <button
          disabled={selectedId === ''}
          className={selectedId === '' ? 'proceed-to-checkout-disabled' : 'proceed-to-checkout'}
          onClick={handleProceedToCheckout}
        >
          Proceed to book consultation
          </button>
      </>
    ) : <h1 className='book-appt-login-text'>Log in to book an appointment!</h1>}  
    </div>
  );
}

export default Appointments;
