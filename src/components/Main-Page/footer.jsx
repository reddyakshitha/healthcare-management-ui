import React, {useEffect} from 'react';
import _ from 'lodash';
import Diversity2Icon from '@mui/icons-material/Diversity2';

const Footer = props => {
  return (
    <div className="healthcare-app-footer">
      <div className='healthcare-app-footer-padding'>
        <div
          className='healthcare-logo-footer'
          >
          <Diversity2Icon
            sx={{ fontSize: 25, color: "#07234B", padding: "0 10px" }} //0078bf
          />
          HMS
        </div>
        <div className='healthcare-logo-footer-disclaimer'>
            FOR PROJECT USE ONLY: CSCE 5430 - Software Engineering - Healthcare Management System &copy; 2022, Team [Akshitha, Nikhila, Poojitha N, Poojitha C, Rishika, Sai Kiran, Sai Krishna, Srikanth, Vaishnavi, Vineeth], All rights reserved. 
        </div>
      </div>
    </div>
  );
}

export default Footer;
