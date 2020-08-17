import {
   api,
   REQUEST_METHODS
 } from './api';
 
 const baseUrl = '/quotes';
 
 export default {
   list: (data) => {
     return api.request({
       url: `${baseUrl}`,
       method: REQUEST_METHODS.get,
       data
     })
   },
   create: (data) => {
    return api.request({
      url: `${baseUrl}`,
      method: REQUEST_METHODS.post,
      data
    })
   },
   update: (id, data) => {
    return api.request({
      url: `${baseUrl}/${id}`,
      method: REQUEST_METHODS.update,
      data
    })
   },
   delete: (id) => {
      return api.request({
         url: `${baseUrl}/${id}`,
         method: REQUEST_METHODS.delete
       })
   }
 }