import {
  api,
  REQUEST_METHODS
} from './api';

const baseUrl = '/admin';

const methods = {
  isAdmin: () => {
    return api.request({
      url: `${baseUrl}/isAdmin`,
      method: REQUEST_METHODS.get,
    })
  },
}

export default methods