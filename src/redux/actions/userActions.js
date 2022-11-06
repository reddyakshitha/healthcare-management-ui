import axiosClient from "../../api/axiosClient";

export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export const STORE_TOKEN = 'STORE_TOKEN';
export const RESET_SIGN_UP = 'RESET_SIGN_UP';

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

export const registerUsers = body => async (dispatch) => {
  try {
    const res = await axiosClient.registerPatients('/api/users', JSON.stringify(body));
    dispatch(storeToken(res.data.token));
  } catch(err) {
    console.log('error', err);
    dispatch(registerUsersErr(err.response.data.errors));
  }
}