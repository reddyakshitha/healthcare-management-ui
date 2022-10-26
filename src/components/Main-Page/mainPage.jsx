import React from 'react';
import Header from '../Header/header';
import Search from '../Search/search';
import CovidBar from '../Covid/covidBar';

function MainPage() {
  return (
    <div className="healthcare-app">
      <CovidBar/>
      <Header/>
      <Search/>
    </div>
  );
}

export default MainPage;
