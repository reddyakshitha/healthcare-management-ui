import React, { useLayoutEffect, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MainPage from './components/Main-Page/container';
import LoginPage from './components/Login-Page/container';
import CovidPage from './components/Covid/covidPage';
import AddComments from './components/AddComments/container';
import PatientHome from './components/PatientHome/container';
import DoctorHome from './components/DoctorHome/container';
import PatientProfile from './components/PatientProfile/container';
import DoctorProfile from './components/DoctorProfile/container';
import PatientSearch from './components/PatientSearch/container';
import AdminHome from './components/AdminHome/container';
import RemoveUser from './components/RemoveUser/container';
import AddUser from './components/AddUser/container';
import ViewEditUsers from './components/ViewEditUsers/container';
import ViewDoctorAppt from './components/ViewDoctorAppt/container';
import Appointments from './components/Appointments/container';
import SpecialityLookup from './components/SpecialityLookup/container';
import StripeContainer from './components/Stripe/stripeContainer';
import UpComingAppt from './components/UpComingAppt/container';

import './App.css';

const App = props => {
  const {
    loadLoggedinUser,
    isLoggedIn
  } =  props;
  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadLoggedinUser(token);
    }
  }, [!isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<MainPage/>} />
        <Route path='/login' exact element={<LoginPage/>} />
        <Route path='/covid-information' exact element={<CovidPage/>} />
        <Route path='/book-appointment' exact element={<Appointments/>} />
        <Route path='/speciality' exact element={<SpecialityLookup/>} />
        <Route path='/patient-home' exact element={<PatientHome/>} />
        <Route path='/doctor-home' exact element={<DoctorHome/>} />
        <Route path='/admin-home' exact element={<AdminHome/>} />
        <Route path='/patient-home/profile' exact element={<PatientProfile/>} />
        <Route path='/doctor-home/profile' exact element={<DoctorProfile/>} />
        <Route path='/doctor-home/patient-search' exact element={<PatientSearch/>} />
        <Route path='/admin-home/view-edit-users' exact element={<ViewEditUsers/>} />
        <Route path='/admin-home/view-doctor-appointmmets' exact element={<ViewDoctorAppt/>} />
        <Route path='/admin-home/revoke-access' exact element={<RemoveUser/>} />
        <Route path='/admin-home/addUser' exact element={<AddUser/>} />
        <Route path='/payment' exact element={<StripeContainer/>} />
        <Route path='/upcoming-appointment' exact element={<UpComingAppt/>} />
        <Route path='/add-comments' exact element={<AddComments/>} />
      </Routes>
    </Router>
  );
}

export default App;
