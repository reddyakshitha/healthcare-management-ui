import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MainPage from './components/Main-Page/mainPage';
import CovidPage from './components/Covid/covidPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<MainPage/>} />
        <Route path='/covid-information' exact element={<CovidPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
