import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import moment from 'moment';
import Header from '../Header/header';
import './stripe.scss';

const PaymentForm = props => {
  const {
    postPayment,
    paymentSuccess,
    profile,
    isLoggedIn,
    data,
    getAllDoctors,
    user,
    paymentSuccessFull,
    SendEmailApi,
    loading,
    emailSuccess,
    emailSent,
    loadLoggedinUser
  } = props;

  const [personalData, setPersonalData] = useState({
    fname: '',
    lname: '',
    amount: '50 USD'
  });
  const {
    fname,
    lname,
    amount
  } = personalData;


  useEffect(() => {
    getAllDoctors();
    const token = localStorage.getItem('token');
    if (token) {
      loadLoggedinUser(token);
    }
}, []);

  const appointmentPayload = {}
    appointmentPayload.doctorEmail = _.get(data, 'state.email', '');
    appointmentPayload.doctorFirstName = _.get(data, 'state.firstName', '');
    appointmentPayload.doctorLastName = _.get(data, 'state.lastName', '');
    appointmentPayload.userEmail = _.get(user, 'email', '');
    appointmentPayload.userFirstName = _.get(user, 'firstName', '');
    appointmentPayload.userLastName = _.get(user, 'lastName', '');
    appointmentPayload.apptDate = moment(_.get(data, 'date', new Date().toISOString().substring(0, 10))).format('YYYY-DD-MM');
    appointmentPayload.startTime = _.get(data, 'timeslot.startTime', '');
    appointmentPayload.endTime = _.get(data, 'timeslot.endTime', '');

  const stripe = useStripe();
  const elements = useElements();
  const emailSecurityToken = '43323419-a782-470c-8e0e-332653f3dd24';

  const onChange = (e) => {
    setPersonalData({...personalData, [e.target.name]: e.target.value});
  }

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#07234B',
        color: '#07234B',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ":-webkit-autofil": {color: '#07234B'},
        "::placeholder": {color: '#07234B'}
      },
      invalid: {
        iconColor: 'red',
        color: 'red'
      }
    }
  };
  const SendEmail = async () => {
    paymentSuccessFull(false);
    const data = {
      email: appointmentPayload.userEmail,
      subject: 'Appointment Confirmation',
      message: `You are confirmed for an appointment with Dr. 
      ${appointmentPayload.doctorFirstName} ${appointmentPayload.doctorLastName} at ${appointmentPayload.startTime} on ${appointmentPayload.apptDate}`
    };
    SendEmailApi(data);
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const {id} = paymentMethod;
      postPayment(id, appointmentPayload);
    } else {
      console.log('err stripe', error);
    }
  } 
  const emailToast = () => {
    return (
      toast(`You are confirmed for an appointment with Dr. 
      ${appointmentPayload.doctorFirstName} ${appointmentPayload.doctorLastName} at ${appointmentPayload.startTime} on ${appointmentPayload.apptDate}.
      You will now be redirected to the home page.`, {
        toastId: 'emailSuccess',
        onClose: () => {
          emailSent(false);
          setTimeout(function() {
            window.location.replace('/');
        }, 5000);
        },
        autoClose: 3000
      })
    )
  }

  if (loading) {
    return (
      <div className="lds-ring">Loading<div></div><div></div><div></div><div></div></div>
    )
  }
  return (
    <>
      <ToastContainer limit={1} autoClose={5000}/>
      {emailSuccess && emailToast()}
      <Header
        isLoggedIn={isLoggedIn}
        profile={profile}
      />
      <>
      <h1 className='payment-page'>Payment Page</h1>
      <form className='payment-form' onSubmit={handleSubmit}>
        <fieldset className='FormGroup formRow-input'>
          <div className="formRow">
          <label className='patient-id-label'>First Name</label>
            <input
              type="string"
              name="fname"
              value={fname}
              onChange={(e) => onChange(e)}
            />
            </div>
          </fieldset>
          <fieldset className='FormGroup formRow-input'>
          <div className="formRow">
          <label className='patient-id-label'>Last Name</label>
            <input
              type="string"
              name="lname"
              value={lname}
              onChange={(e) => onChange(e)}
            />
            </div>
          </fieldset>
          <fieldset className='FormGroup formRow-input'>
          <div className="formRow">
          <label className='patient-id-label'>Amount</label>
            <input
              type="string"
              value={amount}
              disabled={true}
              onChange={(e) => onChange(e)}
            />
            </div>
        </fieldset>
        <fieldset className='FormGroup'>
          <div className="formRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>
        <button
          disabled={emailSuccess || fname === '' || lname === ''}
          // onClick={handlePayment}
          className={emailSuccess || fname === '' || lname === '' ? 'stripe-payment-button-disabled' : 'stripe-payment-button'}
          >
            Pay
          </button>
      </form>
      </>
    {paymentSuccess && <div>
        {SendEmail()}
      </div> }
    </>

  );
}

export default PaymentForm;