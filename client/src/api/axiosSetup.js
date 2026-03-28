import axios from 'axios';

const api = axios.create({
  // Use environment variable for API URL in production, fallback to localhost for dev
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
});

// Intercept outgoing requests and affix the JWT auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Append Bearer context
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
