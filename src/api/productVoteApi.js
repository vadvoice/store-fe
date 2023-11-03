import { api, REQUEST_METHODS } from './api';

const baseUrl = '/productVote';

const methods = {
  makeVote: (id, data) => {
    return api.request({
      url: `${baseUrl}/${id}`,
      method: REQUEST_METHODS.post,
      data,
    });
  },
  delete: (id) => {
    return api.request({
      url: `${baseUrl}/${id}`,
      method: REQUEST_METHODS.delete,
    });
  },
};

export default methods;
