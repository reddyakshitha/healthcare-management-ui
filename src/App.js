import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MainPage from './components/Main-Page/mainPage';
import LoginPage from './components/Login-Page/loginPage';
import CovidPage from './components/Covid/covidPage';
import PatientHome from './components/PatientHome/patientHome';
import PatientProfile from './components/PatientProfile/patientProfile';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<MainPage/>} />
        <Route path='/login' exact element={<LoginPage/>} />
        <Route path='/covid-information' exact element={<CovidPage/>} />
        <Route path='/patient-home' exact element={<PatientHome/>} />
        <Route path='/patient-home/profile' exact element={<PatientProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;
