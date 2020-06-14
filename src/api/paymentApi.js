import {
   api,
   REQUEST_METHODS
 } from './api';
 
 const baseUrl = '/payments';
 
 export default {
   createSession: (data) => {
     return api.request({
       url: `${baseUrl}`,
       method: REQUEST_METHODS.post,
       data
     })
   },
   checkout: (data) => {
    return api.request({
      url: `${baseUrl}/checkout`,
      method: REQUEST_METHODS.post,
      data
    })
   }
 }