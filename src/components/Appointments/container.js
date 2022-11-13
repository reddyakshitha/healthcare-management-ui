import {connect} from 'react-redux';
import Appointments from './appointments';
import {
  getAllDoctors,
  getDoctorAppointments
} from '../../redux/actions/userActions';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    registrationSuccess: state.user.registrationSuccess,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    loading: state.user.loading,
    allDoctors: state.user.allDoctors,
    doctorApptProfile: state.user.doctorApptProfile
  };
};

const mapDispatchToProps = {
  getAllDoctors,
  getDoctorAppointments
};

export default connect(mapStateToProps, mapDispatchToProps)(Appointments);