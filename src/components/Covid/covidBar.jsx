import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import './covid.scss';

const CovidBar = () => {
  const [isExpanded, setExpanded] = useState(false);
  const covidInfo = () => {
    return (
      <div className='covid-header'>
        <div className='covid-header-top'>
          <div className='covid-info'>
            <ReportProblemOutlinedIcon
              sx={{ fontSize: 50, color: "#fff" }}
            />
            COVID-19 INFO
          </div>
          <div onClick={(e) => setExpanded(!isExpanded)}>
            {isExpanded ?
              <KeyboardArrowUpIcon
                sx={{ fontSize: 50, color: "#fff" }}
              /> :
              <KeyboardArrowDownIcon
                sx={{ fontSize: 50, color: "#fff" }}
              />}
          </div>
        </div>
        {isExpanded && <div className='covid-header-bottom'>
          <Link to="/covid-information">Visitation, mask requirements and COVID-19 information</Link>
        </div>}
      </div>
    )
  }
  return (
    <>
      {covidInfo()}
    </>
  )
}

export default CovidBar;
