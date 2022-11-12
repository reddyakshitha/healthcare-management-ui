import React, {useEffect} from 'react';
import _ from 'lodash';
import { useLocation } from "react-router-dom";
import Header from '../Header/header';

const DoctorLookup = props => {
  const location = useLocation();
  const {state} = location;
  console.log('props state', state);
  return (
    <div className="healthcare-app">
      <Header
        isLoggedIn={props.isLoggedIn}
        profile={props.profile}
      />
    </div>
  );
}

export default DoctorLookup;
