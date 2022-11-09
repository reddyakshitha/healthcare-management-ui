import {connect} from 'react-redux';
import {
  loadLoggedinUser,
  updateInfo
} from '../../redux/actions/userActions';
import PatientProfile from './patientProfile';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile
  };
};

const mapDispatchToProps = {
  loadLoggedinUser,
  updateInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);