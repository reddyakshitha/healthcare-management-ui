import React from 'react';
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

import './App.css';

function App() {
  // localStorage.removeItem('token');
  console.log(process.env.NODE_ENV);
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
