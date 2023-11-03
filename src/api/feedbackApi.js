import {
   api,
   REQUEST_METHODS
 } from './api';
 
 const baseUrl = '/feedback';
 
const methods = {
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

 export default methods;