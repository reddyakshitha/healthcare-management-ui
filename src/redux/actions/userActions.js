import axiosClient from "../../api/axiosClient";
import { TimeConfig } from "../../components/PatientHome/timeConfig";
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
export const STORE_DOCTOR_PROFILE_APPOINTMENTS = 'STORE_DOCTOR_PROFILE_APPOINTMENTS';
export const EMAIL_SENT_SUCCESSFULL = 'EMAIL_SENT_SUCCESSFULL';
export const PAYMENT_SUCCESSFULL = 'PAYMENT_SUCCESSFULL';
export const UNIQUE_APPT_ARRAY = 'UNIQUE_APPT_ARRAY';
export const USER_DELETED = 'USER_DELETED';
export const ADMIN_VIEW_EDIT_DATA = 'ADMIN_VIEW_EDIT_DATA';
export const NO_USER_TO_DELETE = 'NO_USER_TO_DELETE';
export const COMMENTS_AND_PRESCRIPTION_UPDATED = 'COMMENTS_AND_PRESCRIPTION_UPDATED';

export const commentsUpdated = flag => {
  return {
    type: COMMENTS_AND_PRESCRIPTION_UPDATED,
    payload: flag
  }
};
export const adminViewEditUserData = data => {
  return {
    type: ADMIN_VIEW_EDIT_DATA,
    payload: data
  }
}
export const noUserToDelete = flag => {
  return {
    type: NO_USER_TO_DELETE,
    payload: flag
  }
}
export const setUserDeleted = flag => {
  return {
    type: USER_DELETED,
    payload: flag
  }
}
export const setUniqueApptArr = arr => {
  return {
    type: UNIQUE_APPT_ARRAY,
    payload: arr
  }
}
export const paymentSuccessFull = flag => {
  return {
    type: PAYMENT_SUCCESSFULL,
    payload: flag
  }
}

export const emailSent = flag => {
  return {
    type: EMAIL_SENT_SUCCESSFULL,
    payload: flag
  }
}

export const storeAllDoctors = payload => {
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

    let searchStructure = [];

    if (payload.length > 0) {
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

    searchStructure = payload.map(item => {
      return {
        id: `Dr ${item.user.firstName} ${item.user.lastName}`,
        value: `Dr ${item.user.firstName} ${item.user.lastName} - ${item.speciality}`,
        label: `Dr ${item.user.firstName} ${item.user.lastName} - ${item.speciality}`,
        section: 'Doctor',
        firstName: item.user.firstName,
        lastName: item.user.lastName,
        email: item.user.email,
        docId: item.user._id,
        speciality: item.speciality,
        education: item.education
      }
    });
  }
    return {
      type: STORE_ALL_DOCTORS,
      cardiologist,
      dentist,
      dermatologist,
      generalSurgeon,
      neurologist,
      oncologist,
      ophthalmologist,
      pediatrician,
      primaryCarePhysician,
      radiologist,
      payload: searchStructure
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
  const upcomingAppointments = _.get(profile, 'upcomingAppointments', []);
  let uniqueArr = [];
  if (upcomingAppointments.length > 0) {
    const kvArray = upcomingAppointments.map(entry => {
      const key = ['apptDate', 'startTime', 'doctorEmail'].map(k => entry[k]).join('|');
      return [key, entry];
     });
     const map = new Map(kvArray);
     uniqueArr = Array.from(map.values());

     uniqueArr.sort((a,b) => -(`${a.apptDate}T${TimeConfig[a.startTime]}`).localeCompare(`${b.apptDate}T${TimeConfig[b.startTime]}`));
    }
  return {
    type: STORE_PROFILE,
    payload: profile,
    uniqueArr
  }
}
export const loadDoctorProfile = profile => {
  return {
    type: STORE_DOCTOR_PROFILE_APPOINTMENTS,
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

export const getUserData = email => async (dispatch) => {
  const body = {
    email
  };
  dispatch(loading(true))
  try {
    const profile = await axiosClient.getUserData('/api/profile/userData', body);
    console.log('get user data', profile);
    const payload = profile.data;
    dispatch(adminViewEditUserData(payload));
    dispatch(loading(false));
  } catch(err) {
    console.log('userdata err', err);
    dispatch(loading(false));
    // dispatch(adminViewEditUserDataErr(true));
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
    localStorage.removeItem('token', token);
    dispatch(loginUsersErr(err.response.data.errors));
  }
};


export const getDoctorAppointments = email => async (dispatch) => {
  const body = {
    email
  }
  try {
    const profile = await axiosClient.getDoctorAppointments('/api/profile/doctorAppointment', body);
    const payload = profile.data;
    dispatch(loadDoctorProfile(payload));
  } catch(err) {
    console.log('err', err);
    dispatch(loginUsersErr(err.response.data.errors));
  }
};
export const revokeUserCredentials = email => async (dispatch) => {
  const body = {
    email
  };
  dispatch(loading(true));
  try {
    const res = await axiosClient.removeUser('/api/profile/removeUser', body);
    console.log('res', res);
    if (res.status === 200) {
      dispatch(setUserDeleted(true));
      dispatch(loading(false));

    }
  } catch(err) {
    dispatch(loading(false));
    console.log('err', err);
    dispatch(noUserToDelete(true));
  }
};


export const getAllDoctors = () => async (dispatch) => {
  try {
    dispatch(loading(true));
    const doctors = await axiosClient.getAllDoctors('/api/profile/allDoctors');
    const payload = _.get(doctors, 'data', []);
    dispatch(storeAllDoctors(payload));
    dispatch(loading(false));
  } catch(err) {
    console.log('err', err);
    dispatch(loginUsersErr(err.response.data.errors));
    dispatch(loading(false));
  }
};

export const updateInfo = (body, token) => async (dispatch) => {
  console.log('JSON.stringify(body)', JSON.stringify(body));
  console.log('token', token);
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

export const updateInfoWithoutToken = (body) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const res = await axiosClient.updateInfoWithoutToken('/api/profile/updateWithoutToken', JSON.stringify(body));
    console.log('res', res);
  dispatch(loading(false));
  dispatch(updateInfoSuccessfull(true));
  } catch (err) {
    console.log('err', err);
    dispatch(loading(false));
    // dispatch(infoUpdateError(err.response.data.errors));
  }
}

export const updateUpcomingAppointment = (appointmentPayload) => async (dispatch) => {
  try {
    const res = await axiosClient.postUpcomingAppointment('/api/profile/upcomingAppointment', JSON.stringify(appointmentPayload));
    if (res.status === 200) {
      console.log('res', res);
    }
  } catch (err) {
    console.log('err', err);
    dispatch(loading(false));
    dispatch(paymentSuccessFull(false));
  }
}

export const updateComments = (appointmentPayload) => async (dispatch) => {
  dispatch(loading(false));
  try {
    const res = await axiosClient.postCommentsAndPrescriptions('/api/profile/commentsAndPrescriptions', JSON.stringify(appointmentPayload));
    if (res.status === 200) {
      console.log('res', res);
      dispatch(loading(false));
      dispatch(commentsUpdated(true));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(loading(false));
    dispatch(commentsUpdated(false));
  }
}

export const postPayment = (body, appointmentPayload) => async (dispatch) => {
  const payload = {
    id: body
  }
  dispatch(loading(true));
  try {
    const res = await axiosClient.postPayment('/api/profile/payment', JSON.stringify(payload));
    if (res.status === 200) {
      await dispatch(updateUpcomingAppointment(appointmentPayload));
      dispatch(loading(false));
      dispatch(paymentSuccessFull(true));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(loading(false));
    dispatch(paymentSuccessFull(false));
  }
}

export const SendEmailApi = (body) => async (dispatch) => {

  dispatch(loading(true));
  try {
    const res = await axiosClient.postEmail('/api/profile/sendemail', JSON.stringify(body));
    if (res.status === 200) {
      dispatch(loading(false));
      dispatch(emailSent(true));
    }
  } catch (err) {
    console.log('err', err);
    dispatch(loading(false));
    dispatch(emailSent(false));
  }
}