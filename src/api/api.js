import axios from 'axios';
import { baseURL } from '../config';

const REQUEST_METHODS = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  update: 'PUT',
};

const axiosConfig = {
  baseURL,
  retries: 2,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
};

const axiosInstance = axios.create(axiosConfig);

const api = {
  request(options = {}) {
    let authToken = '';
    if (localStorage.auth) {
      const { token } = JSON.parse(localStorage.auth);
      authToken = token;

      options.headers = Object.assign((options.headers = {}), {
        Authorization: `${authToken}`,
      });
    }
    return axiosInstance(options)
      .then((res) => res.data)
      .catch(async (error) => {
        if (error && error.response && error.response.status === 401) {
          console.time('refreshToken');
          // TODO: REDO
          return await refreshToken();
        }

        if (error.response) {
          const { data, status, headers } = error.response;
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error({
            status: status,
            headers: headers,
          });
          reportProblem((data && data.message) || error);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error);
          reportProblem(error.message || error);
        }
        if (!error.response) {
          // just show error for user
          reportProblem(error);
        }
        throw error;
      });
  },
};

// TODO: must be called automatically by timer
async function refreshToken() {
  console.timeEnd('refreshToken');
}

function reportProblem(message) {
  console.error(message);
  // TODO: show only success messages
  // iziToast.error({
  //   title: 'Error',
  //   message
  // });
}

export { api, REQUEST_METHODS };
