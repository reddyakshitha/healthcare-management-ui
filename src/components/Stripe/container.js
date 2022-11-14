import {connect} from 'react-redux';
import PaymentForm from './paymentForm';
import {
  postPayment,
  getAllDoctors,
  paymentSuccessFull
} from '../../redux/actions/userActions';

const mapStateToProps = state => {
  return {
    errors: state.user.errors,
    registrationSuccess: state.user.registrationSuccess,
    isLoggedIn: state.user.isLoggedIn,
    profile: state.user.profile,
    loading: state.user.loading,
    allDoctors: state.user.allDoctors,
    doctorApptProfile: state.user.doctorApptProfile,
    paymentSuccess: state.user.paymentSuccess,
    user: state.user.profile.user
  };
};

const mapDispatchToProps = {
  postPayment,
  getAllDoctors,
  paymentSuccessFull
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);