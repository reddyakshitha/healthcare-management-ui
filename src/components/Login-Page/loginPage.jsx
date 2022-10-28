import React from 'react';
import Header from '../Header/header';
import SigninBox from '../SigninBox/signinBox';
import SignupBox from '../SignupBox/signupBox';

const LoginPage = () => {
  return (
    <div className="healthcare-app">
      <Header loginPage/>
      <SigninBox />
    </div>
  );
}

export default LoginPage;
