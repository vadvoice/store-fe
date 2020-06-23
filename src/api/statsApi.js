import {
   api,
   REQUEST_METHODS
} from './api';

const baseUrl = '/stats';

export default {
   track: (data) => {
      return api.request({
         url: `${baseUrl}/track`,
         method: REQUEST_METHODS.post,
         data
      })
   },
   stats: _ => {
      return api.request({
         url: `${baseUrl}/stats`,
         method: REQUEST_METHODS.get,
      })
   }
}