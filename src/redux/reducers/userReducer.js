import {initialState} from './initialState';
import {
  REGISTER_USER_ERROR,
  STORE_TOKEN,
  RESET_SIGN_UP,
  STORE_PROFILE,
  LOGIN_ERROR
} from '../actions/userActions';

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        errors: action.payload
      }
    default:
      return state;
  }
};

export default userReducer;