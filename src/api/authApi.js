import {
   api,
   REQUEST_METHODS
 } from './api';
 
 const baseUrl = '/auth';
 
const methods = {
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

 export default methods;