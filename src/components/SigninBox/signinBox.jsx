import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './signin.scss';

const SigninBox = () => {
  const [signUp, setSignup] = useState(false);
  // const [signIn, setSignin] = useState(true);

  const handleSignupClick = () => {
    // setSignin(false);
    setSignup(!signUp);
  }

  const signin = () => {
    return (
      <div className="healthcare-signin">
        <div className="healthcare-signin-container">
          <div className="healthcare-signin-userId">
            <label className='elementPadding' htmlFor="username">USERNAME</label>
            <input className='elementPadding' type="text" id="username" name="username" required/>
          </div>
          <div className="healthcare-signin-password">
            <label className='elementPadding' htmlFor="password">PASSWORD</label>
            <input className='elementPadding' type="password" id="pass" name="password" autoComplete='off' required/>
          </div>
          <div className="healthcare-signin-login">
            <Link className='healthcare-button-signin' to='/patient-home'>
            <button className='healthcare-button-signin'>
              Log In
            </button>
            </Link>
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

  const signup = () => {
    return (
      <div className="healthcare-register">
        <div className="healthcare-signin-container">
          <div className="healthcare-signin-fname">
            <label className='elementPadding' htmlFor="name">FIRST NAME</label>
            <input className='elementPadding' type="text" id="firstName" name="firstName" required/>
          </div>
          <div className="healthcare-signin-lname">
            <label className='elementPadding' htmlFor="name">LAST NAME</label>
            <input className='elementPadding' type="text" id="lastName" name="lastName" required/>
          </div>
          <div className="healthcare-signin-userId">
            <label className='elementPadding' htmlFor="username">USERNAME</label>
            <input className='elementPadding' type="text" id="username" name="username" required/>
          </div>
          <div className="healthcare-signin-password">
            <label className='elementPadding' htmlFor="password">PASSWORD</label>
            <input className='elementPadding' type="password" id="pass" name="password" autoComplete='off' required/>
          </div>
          <div className="healthcare-signin-password">
            <label className='elementPadding' htmlFor="password">RE-PASSWORD</label>
            <input className='elementPadding' type="password" id="pass" name="password" autoComplete='off' required/>
          </div>
          <div className="healthcare-signin-login">
            <button className='healthcare-button-signin'>
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
        </div>
      </div>
    );
  };

  return (
    <>
      {signUp ? signup() : signin()}
    </>
  );
}

export default SigninBox;
