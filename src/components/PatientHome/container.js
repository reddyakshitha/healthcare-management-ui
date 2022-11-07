import {connect} from 'react-redux';
import {
  loadLoggedinUser
} from '../../redux/actions/userActions';
import PatientHome from './patientHome';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile
  };
};

const mapDispatchToProps = {
  loadLoggedinUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientHome);