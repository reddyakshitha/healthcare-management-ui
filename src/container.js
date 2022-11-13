import {connect} from 'react-redux';
import {
  getAllDoctors,
  loadLoggedinUser
} from './redux/actions/userActions';
import App from './App';

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = {
  getAllDoctors,
  loadLoggedinUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);