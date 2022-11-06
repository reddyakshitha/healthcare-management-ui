import {connect} from 'react-redux';
import LoginPage from './loginPage';
import {
  registerUsers,
  signUpPage
} from '../../redux/actions/userActions';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    registrationSuccess: state.user.registrationSuccess

  };
};

const mapDispatchToProps = {
  registerUsers,
  signUpPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);