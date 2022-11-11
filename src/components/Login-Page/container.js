import {connect} from 'react-redux';
import LoginPage from './loginPage';
import _ from 'lodash';
import {
  registerUsers,
  signUpPage,
  loginUsers,
  clearErrors
} from '../../redux/actions/userActions';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    registrationSuccess: state.user.registrationSuccess,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    isAdmin: _.get(state, 'user.profile.user.isAdmin', false),
    isPatient: _.get(state, 'user.profile.user.isPatient', false),
    isDoctor: _.get(state, 'user.profile.user.isDoctor', false),
    loading: state.user.loading
  };
};

const mapDispatchToProps = {
  registerUsers,
  signUpPage,
  loginUsers,
  clearErrors
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);