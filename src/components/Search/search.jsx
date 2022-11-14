import React, {useState, useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Select from 'react-select'


import './search.scss';

const Search = props => {

  const {
    loading,
    allDoctors
  } = props;

  const [loc, setLoc] = useState('');
  const [payload, setPayload] = useState({});

  const options = [
    { value: 'cardiologist', label: 'Cardiologist', id: 'speciality-cardiologist', section: 'speciality'},
    { value: 'dentist', label: 'Dentist', id: 'speciality-dentist', section: 'speciality'},
    { value: 'dermatologist', label: 'Dermatologist', id: 'speciality-dermatologist', section: 'speciality'},
    { value: 'generalSurgeon', label: 'General Surgeon', id: 'speciality-generalSurgeon', section: 'speciality'},
    { value: 'neurologist', label: 'Neurologist', id: 'speciality-neurologist', section: 'speciality'},
    { value: 'oncologist', label: 'Oncologist', id: 'speciality-oncologist', section: 'speciality'},
    { value: 'ophthalmologist', label: 'Ophthalmologist', id: 'speciality-ophthalmologist', section: 'speciality'},
    { value: 'pediatrician', label: 'Pediatrician', id: 'speciality-pediatrician', section: 'speciality'},
    { value: 'primaryCarePhysician', label: 'Primary Care Physician (PCP)', id: 'speciality-primaryCarePhysician', section: 'speciality'},
    { value: 'radiologist', label: 'Radiologist', id: 'speciality-radiologist', section: 'speciality'}
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: '25px'
    }),
    control: (provided) => ({
      ...provided,
      width: '60vw',
      borderRadius: '50px',
      fontSize: '25px'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }

  const handleOnchange = (e) => {
    if (e.section === 'speciality') {
      const specialityPayload = {
        section: e.value,
        specialityArr: props[e.value],
        loc: 'speciality',
        email: _.get(props[e.value], '0.user.email', ''),
        firstName: _.get(props[e.value], '0.user.firstName', ''),
        lastName: _.get(props[e.value], '0.user.lastName', ''),
        speciality: _.get(props[e.value], '0.speciality', ''),
        education: _.get(props[e.value], '0.education', '')
      };
      setPayload(specialityPayload);
      setLoc('speciality');
    } else {
      const doctorPayload = {
        email: e.email,
        firstName: e.firstName,
        lastName: e.lastName,
        loc: 'doctor',
        speciality: e.speciality,
        education: e.education
      };
      setLoc('doctor');
      setPayload(doctorPayload);
    }
  }
  
  const header = () => {
    return (
      <div className='healthcare-searchbar'>
        <div className='healthcare-searchbarlogo'>
          <Select
            styles={customStyles}
            options={options.concat(allDoctors)}
            placeholder='Speciality / Doctors '
            onChange={(e) => handleOnchange(e)}
          />
        </div>
      </div>
    )
  }
  return (
    <>
      {loc === 'doctor' && <Navigate to='/speciality' state={payload}/>}
      {loc === 'speciality' && <Navigate to='/speciality' state={payload}/>}
      {header()}
    </>
  )
}

export default Search;
