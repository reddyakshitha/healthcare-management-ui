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

};
export default new AxiosClient();