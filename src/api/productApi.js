import { objectToFormData } from 'object-to-formdata';
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
      data: objectToFormData(data),
      headers: {'Content-Type': 'multipart/form-data' }
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
  delete: (productId) => {
    return api.request({
      url: `${baseUrl}/${productId}`,
      method: REQUEST_METHODS.delete,
    })
  },
  update: (productId, data) => {
    return api.request({
      url: `${baseUrl}/${productId}`,
      method: REQUEST_METHODS.update,
      data: objectToFormData(data),
      headers: {'Content-Type': 'multipart/form-data' }
    })
  },
};
