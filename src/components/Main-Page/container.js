import {connect} from 'react-redux';
import MainPage from './mainPage';
import {
  getAllDoctors
} from '../../redux/actions/userActions';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    registrationSuccess: state.user.registrationSuccess,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    loading: state.user.loading
  };
};

const mapDispatchToProps = {
  getAllDoctors
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);