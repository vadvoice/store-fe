const detectBaseUrl = () => {
   const hostname = window && window.location && window.location.hostname;
   let backendHost = '';

   if (~hostname.search('localhost')) {
      backendHost = 'http://localhost:5000/api';
   } else {
      backendHost = `${process.env.REACT_APP_BACKEND_HOST}/api` || process.env.BASE_URL || 'http://localhost:5000/api';
   }
   return backendHost;
}

const baseURL = detectBaseUrl();

export {
   baseURL
};