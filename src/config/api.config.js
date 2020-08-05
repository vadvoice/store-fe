const detectBaseUrl = () => {
   const hostname = window && window.location && window.location.hostname;
   const origin = window && window.location && window.location.origin;
   let backendHost = '';

   if (~hostname.search('localhost') || ~hostname.search('ngrok.io')) {
      backendHost = 'http://localhost:5000/api';
   } else {
      backendHost = `${origin.replace('www', 'www.api') || process.env.REACT_APP_BACKEND_HOST}/api` || process.env.BASE_URL || 'http://localhost:5000/api';
   }
   return backendHost;
}

const baseURL = detectBaseUrl();

export {
   baseURL
};