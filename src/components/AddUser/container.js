import {connect} from 'react-redux';
import {
  loadLoggedinUser,
  updateInfo,
  signOut,
  adminregisterUsers,
  doctorSuccess,
  doctorErr,
  updateInfoSuccessfull,
  getAllDoctors
} from '../../redux/actions/userActions';
import AddUser from './addUser';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    adminRegisteredUserTokens: state.user.adminRegisteredUserTokens,
    registrationDoctorSuccess: state.user.registrationDoctorSuccess,
    registrationDoctorError: state.user.registrationDoctorError,
    profileUpdateSuccess: state.user.profileUpdateSuccess,
    loading: state.user.loading,
    allDoctors: state.user.allDoctors
  };
};

const mapDispatchToProps = {
  loadLoggedinUser,
  updateInfo,
  signOut,
  adminregisterUsers,
  doctorSuccess,
  doctorErr,
  updateInfoSuccessfull,
  getAllDoctors
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);