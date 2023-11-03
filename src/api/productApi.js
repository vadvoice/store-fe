import { api, REQUEST_METHODS } from './api';

const baseUrl = '/products';

// https://stackoverflow.com/a/32918180
// multer currently does not support the array syntax that ng-file-upload uses by default which is files[0], files[1], files[2], etc. multer is expecting a series of files with the same field name.
const convertObjectToFormData = (data) => {
  const form_data = new FormData();
  for (const key in data) {
    const currentValue = data[key];
    if (currentValue instanceof FileList) {
      [...currentValue].forEach((file) => {
        // using the same key without array indexes
        form_data.append(key, file);
      });
    } else {
      form_data.append(key, currentValue);
    }
  }
  return form_data;
};

const methods = {
  create: (data) => {
    return api.request({
      url: `${baseUrl}`,
      method: REQUEST_METHODS.post,
      data: convertObjectToFormData(data),
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  get: (id) => {
    return api.request({
      url: `${baseUrl}/${id}`,
      method: REQUEST_METHODS.get,
    });
  },
  list: () => {
    return api.request({
      url: `${baseUrl}`,
      method: REQUEST_METHODS.get,
    });
  },
  rawList: () => {
    return api.request({
      url: `${baseUrl}/raw`,
      method: REQUEST_METHODS.get,
    });
  },
  delete: (productId) => {
    return api.request({
      url: `${baseUrl}/${productId}`,
      method: REQUEST_METHODS.delete,
    });
  },
  deleteGalleryItem: (productId, itemId) => {
    return api.request({
      url: `${baseUrl}/${productId}/gallery/${itemId}`,
      method: REQUEST_METHODS.delete,
    });
  },
  update: (productId, data) => {
    return api.request({
      url: `${baseUrl}/${productId}`,
      method: REQUEST_METHODS.update,
      data: convertObjectToFormData(data),
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  mark: (productId, data) => {
    return api.request({
      url: `${baseUrl}/${productId}/mark`,
      method: REQUEST_METHODS.post,
      data: data,
    });
  },
};

export default methods;
