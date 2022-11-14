import React, { useLayoutEffect, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MainPage from './components/Main-Page/container';
import LoginPage from './components/Login-Page/container';
import CovidPage from './components/Covid/covidPage';
import PatientHome from './components/PatientHome/container';
import PatientProfile from './components/PatientProfile/container';
import AdminHome from './components/AdminHome/container';
import AddUser from './components/AddUser/container';
import Appointments from './components/Appointments/container';
import SpecialityLookup from './components/SpecialityLookup/container';
import StripeContainer from './components/Stripe/stripeContainer';

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
        <Route path='/admin-home' exact element={<AdminHome/>} />
        <Route path='/patient-home/profile' exact element={<PatientProfile/>} />
        <Route path='/admin-home/addUser' exact element={<AddUser/>} />
        <Route path='/payment' exact element={<StripeContainer/>} />
      </Routes>
    </Router>
  );
}

export default App;
