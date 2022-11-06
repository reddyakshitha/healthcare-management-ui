import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/header';
import SigninBox from '../SigninBox/signinBox';

const LoginPage = props => {
  return (
    <div className="healthcare-app">
      <Header loginPage/>
      <SigninBox
        registerUsers={props.registerUsers}
        errors={props.errors}
        registrationSuccess={props.registrationSuccess}
        signUpPage={props.signUpPage}
        />
    </div>
  );
}

LoginPage.propTypes = {
  errors: PropTypes.array,
  registerUsers: PropTypes.func,
  registrationSuccess: PropTypes.bool,
  signUpPage: PropTypes.func
}

export default LoginPage;
