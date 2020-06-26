import {
   api,
   REQUEST_METHODS
 } from './api';
 
 const baseUrl = '/feedback';
 
 export default {
   list: () => {
    return api.request({
      url: `${baseUrl}`,
      method: REQUEST_METHODS.get,
    })
   },
   leaveFeedback: (data) => {
     return api.request({
       url: `${baseUrl}`,
       method: REQUEST_METHODS.post,
       data
     })
   },
 }