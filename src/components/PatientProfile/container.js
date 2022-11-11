import {connect} from 'react-redux';
import {
  loadLoggedinUser,
  updateInfo,
  signOut,
  updateInfoSuccessfull,
  getAllDoctors
} from '../../redux/actions/userActions';
import PatientProfile from './patientProfile';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    profileUpdateSuccess: state.user.profileUpdateSuccess,
    loading: state.user.loading
  };
};

const mapDispatchToProps = {
  loadLoggedinUser,
  updateInfo,
  signOut,
  updateInfoSuccessfull,
  getAllDoctors
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);