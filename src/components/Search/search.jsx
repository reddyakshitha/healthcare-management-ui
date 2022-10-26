import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Select from 'react-select'


import './search.scss';

const Search = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
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
  
  const header = () => {
    return (
      <div className='healthcare-searchbar'>
        <div className='healthcare-searchbarlogo'>
          <Select
            styles={customStyles}
            options={options}
          />
        </div>
      </div>
    )
  }
  return (
    <>
      {header()}
    </>
  )
}

export default Search;
