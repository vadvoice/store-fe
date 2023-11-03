import { api, REQUEST_METHODS } from './api';

const baseUrl = '/stats';

const methods = {
  track: (data) => {
    return api.request({
      url: `${baseUrl}/track`,
      method: REQUEST_METHODS.post,
      data,
    });
  },
  stats: () => {
    return api.request({
      url: `${baseUrl}/stats`,
      method: REQUEST_METHODS.get,
    });
  },
};

export default methods;
