import React, { useEffect } from 'react';
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
import DoctorLookup from './components/DoctorLookup/container';
import SpecialityLookup from './components/SpecialityLookup/container';

import './App.css';

const App = props => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<MainPage/>} />
        <Route path='/login' exact element={<LoginPage/>} />
        <Route path='/covid-information' exact element={<CovidPage/>} />
        <Route path='/doctor' exact element={<DoctorLookup/>} />
        <Route path='/speciality' exact element={<SpecialityLookup/>} />
        <Route path='/patient-home' exact element={<PatientHome/>} />
        <Route path='/admin-home' exact element={<AdminHome/>} />
        <Route path='/patient-home/profile' exact element={<PatientProfile/>} />
        <Route path='/admin-home/addUser' exact element={<AddUser/>} />
      </Routes>
    </Router>
  );
}

export default App;
