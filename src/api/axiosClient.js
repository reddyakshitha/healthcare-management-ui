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

  updateInfoWithoutToken(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }

  getDoctorAppointments(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }
  removeUser(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }
  
  postPayment(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }  
  postUpcomingAppointment(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }
  postCommentsAndPrescriptions(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }

  postEmail(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }


  getUserData(url, body) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.post(getUrl(url), body, config);
  }

  getAllDoctors(url) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return axios.get(getUrl(url), config);
  }

};
export default new AxiosClient();