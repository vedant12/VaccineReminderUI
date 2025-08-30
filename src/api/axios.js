import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // your backend url
});

// Track duplicate requests (per endpoint)
const pendingRequests = new Set();

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const requestKey = `${config.method}-${config.url}`;
    if (pendingRequests.has(requestKey)) {
      // Block duplicate
      return new Promise(() => { });
    }
    pendingRequests.add(requestKey);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.method}-${response.config.url}`;
    pendingRequests.delete(requestKey);
    return response;
  },
  (error) => {
    if (error.config) {
      const requestKey = `${error.config.method}-${error.config.url}`;
      pendingRequests.delete(requestKey);
    }
    return Promise.reject(error);
  }
);

export default api;
