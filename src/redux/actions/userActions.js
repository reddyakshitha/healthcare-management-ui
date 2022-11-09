import axiosClient from "../../api/axiosClient";
import _ from 'lodash';

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const STORE_TOKEN = 'STORE_TOKEN';
export const RESET_SIGN_UP = 'RESET_SIGN_UP';
export const STORE_PROFILE = 'STORE_PROFILE';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNOUT_USER = 'SIGNOUT_USER';
export const DOCTOR_REGISTER_SUCCESS = 'DOCTOR_REGISTER_SUCCESS';

export const doctorRegistrationSuccess = msg => {
  return {
    type: DOCTOR_REGISTER_SUCCESS,
    payload: msg === 'cred' ? 'Credentials Created' : 'Profile Created'
  }
}
export const signUpPage = () => {
  return {
    type: RESET_SIGN_UP
  }
};
export const signOut = () => {
  localStorage.removeItem('token');
  return {
    type: SIGNOUT_USER
  }
}
export const registerUsersErr = errors => {
  return {
    type: REGISTER_USER_ERROR,
    payload: errors
  }
};

export const storeToken = token => {
  return {
    type: STORE_TOKEN,
    payload: token
  }
}

export const loadProfile = profile => {
  return {
    type: STORE_PROFILE,
    payload: profile
  }
}

export const loginUsersErr = errors => {
  return {
    type: LOGIN_ERROR,
    payload: errors
  }
}
// export const infoUpdateError = errors => {
//   return {
//     type: INFO_UPDATE_ERROR,
//     payload: errors
//   }
// }

export const registerUsers = body => async (dispatch) => {
  try {
    const res = await axiosClient.registerPatients('/api/users', JSON.stringify(body));
    dispatch(storeToken(res.data.token));
    const updateProfile = await axiosClient.updateProfile('/api/profile', res.data.token);
    const payload = updateProfile.data;
    return dispatch(loadProfile(payload));
  } catch(err) {
    dispatch(registerUsersErr(err.response.data.errors));
  }
};

export const registerDoctors = body => async (dispatch) => {
  try {
    const res = await axiosClient.registerPatients('/api/users', JSON.stringify(body));
    const token = res.data.token;
    // dispatch(storeToken(res.data.token));
    const updateProfile = await axiosClient.updateProfile('/api/profile', res.data.token);
    const payload = updateProfile.data;
    if (payload) {
      return dispatch(doctorRegistrationSuccess('cred'));
    }
  } catch(err) {
    dispatch(registerUsersErr(err.response.data.errors));
  }
};


export const loginUsers = body => async (dispatch) => {
  try {
    const res = await axiosClient.loginUsers('/api/auth', JSON.stringify(body));
    const token = res.data.token;
    dispatch(storeToken(token));
    localStorage.setItem('token', token);
    const profile = await axiosClient.getProfile('/api/profile/me', token);
    const payload = profile.data;
    dispatch(loadProfile(payload));
  } catch(err) {
    console.log('err', err);
    dispatch(loginUsersErr(err.response.data.errors));
  }
};


export const loadLoggedinUser = token => async (dispatch) => {
  try {
    dispatch(storeToken(token));
    localStorage.setItem('token', token);
    const profile = await axiosClient.getProfile('/api/profile/me', token);
    const payload = profile.data;
    dispatch(loadProfile(payload));
  } catch(err) {
    console.log('err', err);
    dispatch(loginUsersErr(err.response.data.errors));
  }
};

export const updateInfo = (body, token) => async (dispatch) => {
  try {
    const res = await axiosClient.updateProfile('/api/profile', token, JSON.stringify(body));
  } catch (err) {
    console.log('err', err);
    // dispatch(infoUpdateError(err.response.data.errors));
  }
}