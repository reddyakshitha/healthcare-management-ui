import {connect} from 'react-redux';
import PaymentForm from './paymentForm';
import {
  postPayment,
  getAllDoctors,
  paymentSuccessFull,
  SendEmailApi,
  emailSent,
  loadLoggedinUser
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
    user: state.user.profile.user,
    emailSuccess: state.user.emailSuccess
  };
};

const mapDispatchToProps = {
  postPayment,
  getAllDoctors,
  paymentSuccessFull,
  SendEmailApi,
  emailSent,
  loadLoggedinUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);