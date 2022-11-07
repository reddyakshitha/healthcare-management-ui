import axiosClient from "../../api/axiosClient";

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const STORE_TOKEN = 'STORE_TOKEN';
export const RESET_SIGN_UP = 'RESET_SIGN_UP';
export const STORE_PROFILE = 'STORE_PROFILE';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const signUpPage = () => {
  return {
    type: RESET_SIGN_UP
  }
};
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

export const registerUsers = body => async (dispatch) => {
  try {
    const res = await axiosClient.registerPatients('/api/users', JSON.stringify(body));
    dispatch(storeToken(res.data.token));
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