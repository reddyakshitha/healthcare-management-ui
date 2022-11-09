import {connect} from 'react-redux';
import {
  loadLoggedinUser,
  signOut
} from '../../redux/actions/userActions';
import AdminHome from './adminHome';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile
  };
};

const mapDispatchToProps = {
  loadLoggedinUser,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);