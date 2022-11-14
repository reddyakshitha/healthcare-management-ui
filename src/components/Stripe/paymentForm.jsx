import React, {useState, useEffect} from 'react';
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
    paymentSuccessFull
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


  const appointmentPayload = {}
    appointmentPayload.doctorEmail = data.state.email;
    appointmentPayload.doctorFirstName = data.state.firstName;
    appointmentPayload.doctorLastName = data.state.lastName;
    appointmentPayload.userEmail = user.email;
    appointmentPayload.userFirstName = user.firstName;
    appointmentPayload.userLastName = user.lastName;
    appointmentPayload.apptDate = moment(data.date).utc().format('YYYY-DD-MM');
    appointmentPayload.startTime = data.timeslot.startTime;
    appointmentPayload.endTime = data.timeslot.endTime;

  const stripe = useStripe();
  const elements = useElements();
  const emailSecurityToken = '43323419-a782-470c-8e0e-332653f3dd24';

  useEffect(() => {
    getAllDoctors()
}, []);

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
  const SendEmail = () => {
    paymentSuccessFull(false);
      window.Email.send({
          Host : "smtp.elasticemail.com",
          Username : "seproject2022@yopmail.com",
          Password : "0C79F3EA8986AFDD592FD7686B777128C3F7",
          Port: "2525",
          To : appointmentPayload.userEmail,
          From : "seproject2022@yopmail.com",
          Subject : "Appointment Confirmation",
          Body : `You're confirmed for an appointment with
          Dr.${appointmentPayload.doctorFirstName} ${appointmentPayload.doctorLastName} on
          ${appointmentPayload.apptDate} between ${appointmentPayload.startTime} - ${appointmentPayload.endTime}`
      }).then(
        message => {
          console.log('state check here', data);
          console.log('user check here', user, moment(data.date).utc().format('YYYY-DD-MM'));
          // confirmAppointment(appointmentPayload);
          console.log(message)
        }
      );
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const {id} = paymentMethod;
      postPayment(id);
    } else {
      console.log('err stripe', error);
    }
  } 
  return (
    <>
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
          disabled={fname === '' || lname === ''}
          // onClick={handlePayment}
          className={fname === '' || lname === '' ? 'stripe-payment-button-disabled' : 'stripe-payment-button'}
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