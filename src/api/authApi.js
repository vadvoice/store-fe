import {
   api,
   REQUEST_METHODS
 } from './api';
 
 const baseUrl = '/auth';
 
 export default {
   login: (data) => {
     return api.request({
       url: `${baseUrl}/login`,
       method: REQUEST_METHODS.post,
       data
     })
   },
   getUser: () => {
    return api.request({
      url: `${baseUrl}/user`,
      method: REQUEST_METHODS.get,
    })
   }
 }