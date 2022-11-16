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
  noUserToDelete
} from '../../redux/actions/userActions';
import RemoveUser from './removeUser';

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
    noUserExist: state.user.noUserExist
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
  noUserToDelete
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveUser);