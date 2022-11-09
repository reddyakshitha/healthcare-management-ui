import axios from 'axios';
import {getUrl} from './getUrl';

class AxiosClient {
  registerPatients(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }

  loginUsers(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }

  loggedInUsers(url, token) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-auth-token': token
      }
    }
    return axios.get(getUrl(url), config);
  }

  getProfile(url, token) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-auth-token': token
      }
    }
    return axios.get(getUrl(url), config);
  }

  updateProfile(url, token, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-auth-token': token
      }
    }
    return axios.post(getUrl(url), body, config);

  }

};
export default new AxiosClient();