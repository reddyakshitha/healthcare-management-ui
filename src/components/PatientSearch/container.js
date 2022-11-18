import {connect} from 'react-redux';
import {
  loadLoggedinUser,
  updateInfo,
  signOut,
  adminregisterUsers,
  doctorSuccess,
  doctorErr,
  updateInfoSuccessfull,
  getAllDoctors,
  revokeUserCredentials,
  setUserDeleted,
  noUserToDelete,
  getUserData,
  updateInfoWithoutToken
} from '../../redux/actions/userActions';
import PatientSearch from './patientSearch';

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
    allDoctors: state.user.allDoctors,
    userDelete: state.user.userDelete,
    noUserExist: state.user.noUserExist,
    adminViewData: state.user.adminViewData
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
  getAllDoctors,
  revokeUserCredentials,
  setUserDeleted,
  noUserToDelete,
  getUserData,
  updateInfoWithoutToken
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientSearch);