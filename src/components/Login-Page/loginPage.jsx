import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
        isAdmin={_.get(props, 'isAdmin', false)}
        isPatient={_.get(props, 'isPatient', false)}
        isDoctor={_.get(props, 'isDoctor', false)}
        clearErrors={props.clearErrors}
        loading={props.loading}
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
