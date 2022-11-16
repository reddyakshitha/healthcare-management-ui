import React, {useEffect} from 'react';
import _ from 'lodash';
import Header from '../Header/header';
import Search from '../Search/search';
import CovidBar from '../Covid/covidBar';
import HomePageBody from '../Home-Body/homeMidSec';
import Footer from './footer';

const MainPage = props => {
  const {
    getAllDoctors,
    loading
  } = props;
  useEffect(() => {
      getAllDoctors()
  }, []);
  if (loading) {
    return (
      <div className="lds-ring">Loading<div></div><div></div><div></div><div></div></div>
    );
  }
  return (
    <div className="healthcare-app">
      <CovidBar/>
      <Header
        isLoggedIn={props.isLoggedIn}
        profile={props.profile}
      />
      {_.get(props, 'profile.user.isPatient', true) && <Search
        cardiologist={props.cardiologist}
        dentist={props.dentist}
        dermatologist={props.dermatologist}
        generalSurgeon={props.generalSurgeon}
        neurologist={props.neurologist}
        oncologist={props.oncologist}
        ophthalmologist={props.ophthalmologist}
        pediatrician={props.pediatrician}
        primaryCarePhysician={props.primaryCarePhysician}
        radiologist={props.radiologist}
        getAllDoctors={props.getAllDoctors}
        loading={props.loading}
        allDoctors={props.allDoctors}
      />}
      <HomePageBody/>
      <Footer />
    </div>
  );
}

export default MainPage;
