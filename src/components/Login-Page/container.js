import {connect} from 'react-redux';
import LoginPage from './loginPage';
import {
  registerUsers,
  signUpPage,
  loginUsers
} from '../../redux/actions/userActions';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    registrationSuccess: state.user.registrationSuccess,
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = {
  registerUsers,
  signUpPage,
  loginUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);