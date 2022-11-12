import {connect} from 'react-redux';
import {
  getAllDoctors
} from './redux/actions/userActions';
import App from './App';

const mapStateToProps = state => {
  return {
    loading: state.user.loading
  };
};

const mapDispatchToProps = {
  getAllDoctors
};

export default connect(mapStateToProps, mapDispatchToProps)(App);