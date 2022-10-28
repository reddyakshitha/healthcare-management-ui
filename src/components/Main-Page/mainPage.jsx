import React from 'react';
import Header from '../Header/header';
import Search from '../Search/search';
import CovidBar from '../Covid/covidBar';
import HomePageBody from '../Home-Body/homeMidSec';

function MainPage() {
  return (
    <div className="healthcare-app">
      <CovidBar/>
      <Header/>
      <Search/>
      <HomePageBody/>
    </div>
  );
}

export default MainPage;
