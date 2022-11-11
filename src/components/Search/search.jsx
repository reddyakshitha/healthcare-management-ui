import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Select from 'react-select'


import './search.scss';

const Search = props => {

  const {
    getAllDoctors,
    loading
  } = props;
  useEffect(() => {
    getAllDoctors()
  }, []);

  const options = [
    { value: 'cardiologist', label: 'Cardiologist', id: 'speciality-cardiologist'},
    { value: 'dentist', label: 'Dentist', id: 'speciality-dentist'},
    { value: 'dermatologist', label: 'Dermatologist', id: 'speciality-dermatologist'},
    { value: 'generalSurgeon', label: 'General Surgeon', id: 'speciality-generalSurgeon'},
    { value: 'neurologist', label: 'Neurologist', id: 'speciality-neurologist'},
    { value: 'oncologist', label: 'Oncologist', id: 'speciality-oncologist'},
    { value: 'ophthalmologist', label: 'Ophthalmologist', id: 'speciality-ophthalmologist'},
    { value: 'pediatrician', label: 'Pediatrician', id: 'speciality-pediatrician'},
    { value: 'primaryCarePhysician', label: 'Primary Care Physician (PCP)', id: 'speciality-primaryCarePhysician'},
    { value: 'radiologist', label: 'Radiologist', id: 'speciality-radiologist'}
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
    console.log('search onchange called', e);
  }
  
  const header = () => {
    return (
      <div className='healthcare-searchbar'>
        <div className='healthcare-searchbarlogo'>
          <Select
            styles={customStyles}
            options={options}
            placeholder='Speciality...'
            onChange={(e) => handleOnchange(e)}
          />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="lds-ring">Loading<div></div><div></div><div></div><div></div></div>
    );
  }

  return (
    <>
      {header()}
    </>
  )
}

export default Search;
