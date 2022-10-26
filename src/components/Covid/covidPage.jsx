import React from 'react';
import Header from '../Header/header';

const CovidPage = () => {
  return (
    <div className='covid-information-page'>
      <Header />
      <div className='covid-doc-pic'/>
      <div className='covid-page-body'>
        <h1 className='covid-info-header'>
          The pandemic isn't over yet, COVID-19 is still here.
        </h1>
        <p className='covid-cdc'>
        But as the threat decreases and Centers for Disease Control (CDC) guidelines evolve,
        we’re learning how to live with it.
        Your health and safety remain our No. 1 priority.
         But you’ll find we’re doing things a little differently in this new phase of the pandemic.
         From visiting loved ones to wearing masks to getting COVID testing, we have the information you need.
        </p>
        <h2>
        We ask that you help us maintain a safe environment by following the guidelines mentioned by 
        <a
          href='https://www.cdc.gov/coronavirus/2019-ncov/your-health/index.html'
          target='_blank'
          > Centers for Disease Control (CDC)
          </a>
        </h2>
      </div>
    </div>
  );
}

export default CovidPage;