import React from 'react';
import Header from '../Header/header';
import Search from '../Search/search';
import CovidBar from '../Covid/covidBar';
import HomePageBody from '../Home-Body/homeMidSec';

const MainPage = props => {
  return (
    <div className="healthcare-app">
      <CovidBar/>
      <Header
        isLoggedIn={props.isLoggedIn}
        profile={props.profile}
      />
      <Search/>
      <HomePageBody/>
    </div>
  );
}

export default MainPage;
