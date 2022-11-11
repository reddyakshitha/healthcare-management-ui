import axiosClient from "../../api/axiosClient";
import _ from 'lodash';

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const STORE_TOKEN = 'STORE_TOKEN';
export const RESET_SIGN_UP = 'RESET_SIGN_UP';
export const STORE_PROFILE = 'STORE_PROFILE';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNOUT_USER = 'SIGNOUT_USER';
export const DOCTOR_REGISTER_SUCCESS = 'DOCTOR_REGISTER_SUCCESS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const LOADING = 'LOADING';
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS';
export const ADMIN_STORE_TOKEN_OF_USERS = 'ADMIN_STORE_TOKEN_OF_USERS';
export const DOCTOR_REGISTER_ERROR = 'DOCTOR_REGISTER_ERROR';
export const STORE_ALL_DOCTORS = 'STORE_ALL_DOCTORS';


export const storeAllDoctors = payload => {
  if (payload.length > 0) {
    let cardiologist = [];
    let dentist = [];
    let dermatologist = [];
    let generalSurgeon = [];
    let neurologist = [];
    let oncologist = [];
    let ophthalmologist = [];
    let pediatrician = [];
    let primaryCarePhysician = [];
    let radiologist = [];

    cardiologist = payload.filter(item => item.speciality === 'cardiologist');
    dentist = payload.filter(item => item.speciality === 'dentist');
    dermatologist = payload.filter(item => item.speciality === 'dermatologist');
    generalSurgeon = payload.filter(item => item.speciality === 'generalSurgeon');
    neurologist = payload.filter(item => item.speciality === 'neurologist');
    oncologist = payload.filter(item => item.speciality === 'oncologist');
    ophthalmologist = payload.filter(item => item.speciality === 'ophthalmologist');
    pediatrician = payload.filter(item => item.speciality === 'pediatrician');
    primaryCarePhysician = payload.filter(item => item.speciality === 'primaryCarePhysician');
    radiologist = payload.filter(item => item.speciality === 'radiologist');

    console.log(cardiologist,
      dentist,
      dermatologist,
      generalSurgeon,
      neurologist,
      oncologist,
      ophthalmologist,
      pediatrician,
      primaryCarePhysician,
      radiologist);
    return {
      type: STORE_ALL_DOCTORS
    }

  }
}
export const updateInfoSuccessfull = flag => {
  return {
    type: UPDATE_INFO_SUCCESS,
    payload: flag
  }
}

export const loading = flag => {
  return {
    type: LOADING,
    payload: flag
  }
}
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
export const doctorSuccess = (flag) => {
  return {
    type: DOCTOR_REGISTER_SUCCESS,
    payload: flag
  }
}

export const doctorErr = (flag) => {
  return {
    type: DOCTOR_REGISTER_ERROR,
    payload: flag
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

export const adminStoreToken = token => {
  return {
    type: ADMIN_STORE_TOKEN_OF_USERS,
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


export const adminregisterUsers = body => async (dispatch) => {
  try {
    const res = await axiosClient.registerPatients('/api/users', JSON.stringify(body));
    dispatch(adminStoreToken(res.data.token));
    const updateProfile = await axiosClient.updateProfile('/api/profile', res.data.token);
    // const payload = updateProfile.data;
    return dispatch(doctorSuccess(true));
  } catch(err) {
    console.log('err', err);
    dispatch(doctorErr(true));
    dispatch(registerUsersErr(err.response.data.errors));
  }
};

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

// export const registerDoctors = body => async (dispatch) => {
//   try {
//     const res = await axiosClient.registerPatients('/api/users', JSON.stringify(body));
//     const token = res.data.token;
//     // dispatch(storeToken(res.data.token));
//     const updateProfile = await axiosClient.updateProfile('/api/profile', res.data.token);
//     const payload = updateProfile.data;
//     if (payload) {
//       return dispatch(doctorRegistrationSuccess('cred'));
//     }
//   } catch(err) {
//     dispatch(registerUsersErr(err.response.data.errors));
//   }
// };


export const loginUsers = body => async (dispatch) => {
  dispatch(loading(true));
  try {
    const res = await axiosClient.loginUsers('/api/auth', JSON.stringify(body));
    const token = res.data.token;
    dispatch(storeToken(token));
    localStorage.setItem('token', token);
    const profile = await axiosClient.getProfile('/api/profile/me', token);
    const payload = profile.data;
    dispatch(loadProfile(payload));
    dispatch(loading(false));
  } catch(err) {
    console.log('err', err);
    dispatch(loginUsersErr(err.response.data.errors));
    dispatch(loading(false));
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


export const getAllDoctors = () => async (dispatch) => {
  try {
    const doctors = await axiosClient.getAllDoctors('/api/profile/allDoctors');
    const payload = doctors.data;
    console.log(payload)
    dispatch(storeAllDoctors(payload));
  } catch(err) {
    console.log('err', err);
    dispatch(loginUsersErr(err.response.data.errors));
  }
};

export const updateInfo = (body, token) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const res = await axiosClient.updateProfile('/api/profile', token, JSON.stringify(body));
  dispatch(loading(false));
  dispatch(updateInfoSuccessfull(true));
  } catch (err) {
    console.log('err', err);
    dispatch(loading(false));
    // dispatch(infoUpdateError(err.response.data.errors));
  }
}