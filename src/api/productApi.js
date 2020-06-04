import {
  api,
  REQUEST_METHODS
} from './api';

const baseUrl = '/products';

export default {
  create: (data) => {
    return api.request({
      url: `${baseUrl}`,
      method: REQUEST_METHODS.post,
      data
    })
  },
  get: (id) => {
    return api.request({
      url: `${baseUrl}/${id}`,
      method: REQUEST_METHODS.get,
    })
  },
  list: () => {
    return api.request({
      url: `${baseUrl}`,
      method: REQUEST_METHODS.get,
    })
  },
  delete: (data) => {
    return api.request({
      url: `${baseUrl}/${data.productId}`,
      method: REQUEST_METHODS.delete,
    })
  },
  update: (data) => {
    const { productId } = data;
    return api.request({
      url: `${baseUrl}/${productId}`,
      method: REQUEST_METHODS.update,
      data
    })
  },
};
