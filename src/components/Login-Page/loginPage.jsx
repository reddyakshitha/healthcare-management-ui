import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import SigninBox from '../SigninBox/signinBox';

const LoginPage = props => {
  return (
    <div className="healthcare-app">
      <Header
        loginPage
        isLoggedIn={props.isLoggedIn}
        profile={props.profile}
      />
      <SigninBox
        registerUsers={props.registerUsers}
        errors={props.errors}
        registrationSuccess={props.registrationSuccess}
        signUpPage={props.signUpPage}
        loginUsers={props.loginUsers}
        isLoggedIn={props.isLoggedIn}
        />
    </div>
  );
}

LoginPage.propTypes = {
  errors: PropTypes.array,
  loginUsers: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  registerUsers: PropTypes.func,
  registrationSuccess: PropTypes.bool,
  signUpPage: PropTypes.func
}

export default LoginPage;
