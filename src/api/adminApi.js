import {
  api,
  REQUEST_METHODS
} from './api';

const baseUrl = '/admin';

export default {
  isAdmin: () => {
    return api.request({
      url: `${baseUrl}/isAdmin`,
      method: REQUEST_METHODS.get,
    })
  },
}