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
    loading: state.user.loading,
    allDoctors: state.user.allDoctors,
    cardiologist: state.user.cardiologist,
    dentist: state.user.dentist,
    dermatologist: state.user.dermatologist,
    generalSurgeon: state.user.generalSurgeon,
    neurologist: state.user.neurologist,
    oncologist: state.user.oncologist,
    ophthalmologist: state.user.ophthalmologist,
    pediatrician: state.user.pediatrician,
    primaryCarePhysician: state.user.primaryCarePhysician,
    radiologist: state.user.radiologist
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