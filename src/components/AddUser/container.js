import {connect} from 'react-redux';
import {
  loadLoggedinUser,
  updateInfo,
  signOut
} from '../../redux/actions/userActions';
import AddUser from './addUser';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile
  };
};

const mapDispatchToProps = {
  loadLoggedinUser,
  updateInfo,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);