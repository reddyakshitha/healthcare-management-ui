import React, {useState} from 'react';
// import {Link} from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { Navigate } from "react-router-dom";
import './signin.scss';

const SigninBox = props => {
  const {
    registerUsers,
    errors,
    registrationSuccess,
    signUpPage,
    loginUsers,
    isLoggedIn,
    isAdmin,
    isPatient,
    isDoctor,
    clearErrors,
    loading
  } = props;

  const location = useLocation();

  const [signUp, setSignup] = useState(false);
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const handleSignInClick = () => {
    setSignup(!signUp);
    signUpPage();
    clearErrors();
    if (fname !== '') setFirstName('');
    if (lname !== '') setLastName('');
    if (email !== '') setEmail('');
    if (password !== '') setPassword('');
  }
  const handleSignupClick = () => {
    setSignup(!signUp);
    clearErrors();
    if (fname !== '') setFirstName('');
    if (lname !== '') setLastName('');
    if (email !== '') setEmail('');
    if (password !== '') setPassword('');
  }

  const handleLoginClick = () => {
    const payload = {
      email: signinEmail,
      password: signinPassword
    };
    loginUsers(payload);
  }

  const handleRegister = () => {
    const payload = {
      firstName: fname,
      lastName: lname,
      email,
      password
    };
    registerUsers(payload);
  }

  const errorsMap = () => {
    if (errors.length > 0) {
      const errContainer = errors.map((item, i) => {
        return (
          <div className='error' key={i}>
            {item.msg}
          </div>
        );
      });
      return errContainer
    }
  }

  const signin = () => {
    return (
      <div className="healthcare-signin">
        <div className="healthcare-signin-container">
          <div className="healthcare-signin-userId">
            <label className='elementPadding' htmlFor="login-email">EMAIL</label>
            <input
              className='elementPadding'
              type="text"
              id="login-email"
              name="login-email"
              required
              onChange={e => setSigninEmail(e.target.value)}
              value={signinEmail}
            />
          </div>
          <div className="healthcare-signin-password">
            <label className='elementPadding' htmlFor="login-password">PASSWORD</label>
            <input
              className='elementPadding'
              type="password"
              id="login-pass"
              name="login-password"
              autoComplete='off'
              required
              onChange={e => setSigninPassword(e.target.value)}
              value={signinPassword}
            />
          </div>
          <div className="healthcare-signin-login">
            {/* <Link className='healthcare-button-signin' to='/patient-home'> */}
            <button
              disabled={signinEmail === '' && signinPassword === ''}
              className={`${signinEmail !== '' && signinPassword !== '' ? 'healthcare-button-signin' : 'btn-disabled'}`}
              onClick={handleLoginClick}
            >
              Log In
            </button>
            {/* </Link> */}
          </div>
          <div className="healthcare-signup-errors">
            {_.get(props, 'errors', []).length > 0 && errorsMap()}
          </div>
          <div className='or-separator'>OR</div>
          <div className='noAccount'>No account yet ?</div>
          <div className='healthcare-signup'>
            <button
              className='healthcare-button-signup'
              onClick={handleSignupClick}
              >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };

  const signup = didRegister => {

    return (
      <div className="healthcare-register">
        <div className="healthcare-signin-container">
          {didRegister ?
            (
            <>
              <div className="healthcare-signup-registered">
                Registration Successful, Please Sign In.
              </div>
              <div className='healthcare-signup'>
              <button
                className='healthcare-button-signup'
                onClick={handleSignInClick}
              >
                  Sign In
                </button>
              </div>
            </>) : (
            <>
                <div className="healthcare-signin-fname">
                <label className='elementPadding' htmlFor="name">FIRST NAME</label>
                <input
                  className='elementPadding'
                  type="text" id="firstName"
                  name="firstName"
                  required
                  onChange={e => setFirstName(e.target.value)}
                  value={fname}
                />
              </div>
              <div className="healthcare-signin-lname">
                <label className='elementPadding' htmlFor="name">LAST NAME</label>
                <input
                  className='elementPadding'
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  onChange={e => setLastName(e.target.value)}
                  value={lname}
                />
              </div>
              <div className="healthcare-signin-userId">
                <label className='elementPadding' htmlFor="username">EMAIL</label>
                <input
                  className='elementPadding'
                  type="email"
                  id="username"
                  name="username"
                  required
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="healthcare-signin-password">
                <label className='elementPadding' htmlFor="password">PASSWORD</label>
                <input
                  className='elementPadding'
                  type="password"
                  id="pass"
                  name="password"
                  autoComplete='off'
                  required
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="healthcare-signup-errors">
                {_.get(props, 'errors', []).length > 0 && errorsMap()}
              </div>
              <div className="healthcare-signin-login">
                <button
                  className='healthcare-button-signin'
                  onClick={handleRegister}
                >
                  Sign Up
                </button>
              </div>
              <div className='or-separator'>OR</div>
              <div className='noAccount'>Already have an account?</div>
              <div className='healthcare-signup'>
                <button
                  className='healthcare-button-signup'
                  onClick={handleSignupClick}
                  >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="lds-ring">Loading<div></div><div></div><div></div><div></div></div>
    );
  }

  return (
    <>
      {isLoggedIn && isPatient && <Navigate to="/patient-home"/>}
      {isLoggedIn && isDoctor && <Navigate to="/doctor-home"/>}
      {isLoggedIn && isAdmin && <Navigate to="/admin-home"/>}
      {registrationSuccess && signUp ? signup(true) :
      !registrationSuccess && signUp ? signup(false) :
      signin()}
    </>
  );
}

export default SigninBox;
