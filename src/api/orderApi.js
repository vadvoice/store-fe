import {
   api,
   REQUEST_METHODS
} from './api';

const baseUrl = '/orders';

export default {
   activeOrders: () => {
      return api.request({
         url: `${baseUrl}/activeOrders`,
         method: REQUEST_METHODS.get,
      })
   },
   resolve: (id) => {
      return api.request({
         url: `${baseUrl}/resolve/${id}`,
         method: REQUEST_METHODS.post,
      })
   },
   reject: (id) => {
      return api.request({
         url: `${baseUrl}/reject/${id}`,
         method: REQUEST_METHODS.post,
      })
   },
}