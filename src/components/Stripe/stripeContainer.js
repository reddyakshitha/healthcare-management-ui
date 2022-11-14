import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { useLocation } from "react-router-dom";
import PaymentForm from './container';

const PUBLIC_KEY = "pk_test_51M3kZfDVDnjiM1MnUoOiuPGzgCP8uegDENeuuWbRSGWwM9HZVZhud1A3zhngmN4aX02Jcq3Eu2QGtDenPoxb3dB400uO24L0k7";

const stripTestPromise = loadStripe(PUBLIC_KEY);


const StripeContainer = () => {

  const location = useLocation();
  const {state} = location;
  
  return (
    <Elements stripe={stripTestPromise}>
      <PaymentForm data={state}/>
    </Elements>
  )
};

export default StripeContainer;