import React, {useEffect, useState} from 'react';
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
    doctorApptProfile
  } = props;

  useEffect(() => {
    getAllDoctors();
    if (state.email) {
      getDoctorAppointments(state.email)
    }
  }, []);

  const location = useLocation();
  const {state} = location;
  const [value, onChange] = useState(new Date());
  const [selectedId, setSelectedId] = useState('');

  const handleTimeslot = item => {
    setSelectedId(item.id);
  };

  const handleProceedToCheckout = () => {
    console.log('proceed to checkout clicked');
  }

  const renderTime = () => {
    let checkUnavailableAppt = [];
    appointmentConfig.map(item => item.isUnavailable = false);

    const appointmentArr = _.get(doctorApptProfile, 'upcomingAppointments', []);

    const selectedDateFormat = moment(value).utc().format('YYYY-DD-MM');
    
    const appointmentArrFilter = appointmentArr.filter(item => item.date === selectedDateFormat);

    if (appointmentArrFilter.length > 0) {
      checkUnavailableAppt = appointmentConfig.map(item => {
        let newItem = item;
        if (item.startTime === appointmentArrFilter[0].startTime && item.endTime === appointmentArrFilter[0].endTime) {
          newItem.isUnavailable = true
        };
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

  return (
    <div className="healthcare-app">
      <Header
        isLoggedIn={props.isLoggedIn}
        profile={props.profile}
      />
      <div className='appointment-calander-container'>
        <h1>Book an Appointment</h1>
        <div className='appointment-date-picker'>
          <Calendar
            onChange={onChange}
            value={value}
            minDate={new Date()}
            defaultValue={new Date()}
            />
          <div className='appointment-time-picker'>
            {renderTime()}
          </div>
        </div>
      </div>
      <button
        className='proceed-to-checkout'
        onClick={handleProceedToCheckout}
      >
        Proceed to checkout
      </button>
    </div>
  );
}

export default Appointments;
