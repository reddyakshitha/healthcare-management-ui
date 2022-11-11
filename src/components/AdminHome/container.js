import {connect} from 'react-redux';
import {
  loadLoggedinUser,
  signOut,
  getAllDoctors
} from '../../redux/actions/userActions';
import AdminHome from './adminHome';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    loading: state.user.loading
  };
};

const mapDispatchToProps = {
  loadLoggedinUser,
  signOut,
  getAllDoctors
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);