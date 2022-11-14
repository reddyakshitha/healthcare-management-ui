import {initialState} from './initialState';
import {
  REGISTER_USER_ERROR,
  STORE_TOKEN,
  RESET_SIGN_UP,
  STORE_PROFILE,
  LOGIN_ERROR,
  SIGNOUT_USER,
  DOCTOR_REGISTER_SUCCESS,
  CLEAR_ERRORS,
  LOADING,
  UPDATE_INFO_SUCCESS,
  ADMIN_STORE_TOKEN_OF_USERS,
  DOCTOR_REGISTER_ERROR,
  STORE_ALL_DOCTORS,
  STORE_DOCTOR_PROFILE_APPOINTMENTS,
  PAYMENT_SUCCESSFULL
} from '../actions/userActions';

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_SUCCESSFULL:
      return {
        ...state,
        paymentSuccess: action.payload
      }
    case STORE_ALL_DOCTORS:
      return {
        ...state,
        cardiologist: action.cardiologist,
        dentist: action.dentist,
        dermatologist: action.dermatologist,
        generalSurgeon: action.generalSurgeon,
        neurologist: action.neurologist,
        oncologist: action.oncologist,
        ophthalmologist: action.ophthalmologist,
        pediatrician: action.pediatrician,
        primaryCarePhysician: action.primaryCarePhysician,
        radiologist: action.radiologist,
        allDoctors: action.payload
      }
    case ADMIN_STORE_TOKEN_OF_USERS:
      return {
        ...state,
        adminRegisteredUserTokens: action.payload
      }
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        profileUpdateSuccess: action.payload
      }
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      }
    case DOCTOR_REGISTER_SUCCESS:
      return {
        ...state,
        registrationDoctorSuccess: action.payload,
        registrationDoctorError: false,
        errors: []
      }
    case DOCTOR_REGISTER_ERROR:
      return {
        ...state,
        registrationDoctorSuccess: false,
        registrationDoctorError: action.payload
      }
    case SIGNOUT_USER:
      return initialState;
    case REGISTER_USER_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case STORE_TOKEN:
      return {
        ...state,
        token: action.payload,
        errors: [],
        registrationSuccess: true
      };
    case RESET_SIGN_UP:
      return {
        ...state,
        registrationSuccess: false
      }
    case STORE_PROFILE:
      return {
        ...state,
        isLoggedIn: true,
        profile: action.payload,
        errors: []
      }
    case STORE_DOCTOR_PROFILE_APPOINTMENTS:
      return {
        ...state,
        doctorApptProfile: action.payload
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        errors: action.payload
      }
    default:
      return initialState;
  }
};

export default userReducer;