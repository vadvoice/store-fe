const detectBaseUrl = () => {
   const hostname = window && window.location && window.location.hostname;
   // TODO: replace with real one
   // const origin = window && window.location && window.location.origin;
   let backendHost = '';

   if (~hostname.search('localhost') || ~hostname.search('ngrok.io')) {
      backendHost = 'http://localhost:3001/api';
   } else {
      // TODO:
      // backendHost = `${origin.replace('www', 'www.api') || process.env.REACT_APP_BACKEND_HOST}/api` || process.env.BASE_URL || 'http://localhost:5000/api';
      backendHost = 'https://storeapi-vizionarts.vercel.app/api';
   }
   return backendHost;
}

const baseURL = detectBaseUrl();

export {
   baseURL
};