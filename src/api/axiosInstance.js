import axios from "axios";
import { baseUrl } from "./api.js";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (token) => {
  refreshSubscribers.map((callback) => callback(token));
};

const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.url.includes('/login') || config.url.includes('/registerUser')) {
      config.headers.Authorization = 'DwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNSAwIFI+Pi9FeHRHU3RhdGU8PC9HUzcgNyAwIFIvR1M4IDggMCBSPj4vUHJ';
    } else if (config.url.includes('/verifyToken')) {
      config.headers.Authorization = 'eyJraWQiOiI3NDk1Y2ZiNy0wYzEzLTQzMGMtOGQ3Zi1hMWRlMGVkNGEwMzUiLCJ0eXBlIjoiand0IiwiYWxnIjoiUlM1MTIifQ.eyJpYXQiOjE3MTQ2Njg2MzIsImV4cCI6MTcxNDY2OTUzMiwiaXNzIjoiaHR0cDovL3d3dy5kZXYtbmVzdC5jby56YS9hdXRoU2VydmVyIiwiZW52IjoiZGV2IiwiaWROdW1iZXIiOiIiLCJyb2xlcyI6WyJjbGllbnQiXSwidXNlcm5hbWUiOiJubmlraGl0aGFAc3VuZ2xvYmFsYWdlbmN5LmNvbSIsInVzZXJJZCI6IjIifQ.al-DI0GJmgs9bWmbSWbHQuAT0Z07F-ls5HxZtgQxzWvC9DWn9AiH0i_NTkB6Jpd5QPrdmn4Pf2cVWK6-TCDKA0O0ge0dlbr-AYq7vuvnP1OeFfB4Ijgg4hMiF2PSf-hXBGyes3Hx7cbE0EmGLJ0oWW601TiNVcd7Dq513VU9A186SXHmscBwaL0MhofK42wsDDvYOTkRIMr5do4yF3abdcezterb7cd8rjEy0nZjMHPLnROgA-6eMV4ExAG-HSQ1O7N1nNgIls-ZV66LMLWaZPGx3KZEeOVz-F61P_O0_pSB2QdcSdKB4ZeaMdWFw_JDviYG3LVwllT5pPexaOodnyQxXiXZrX1LMMXs7swRu801OHzJkCVaAy3WdNyZDZ65g_U9qQ-s3Fz5NiI_rRwgzT3JUCM6d8UF3TlzBSFChVU4AxoD5AOdZlpunk25HtUy75kwAcXa1L12WrJDl37PK5g1gxwKZFHN-wzu96WhYnUm4n-hkeZ8oPK2AVIVREM9VDFIodMVeePitpJXGDAW6BPqQUB7deRpyU4QXjcuTisWhEpF9efri7atpQqBfVjWFBQrT3q_1ncf912nTats4Np_v19-rTK0zrwXlnaRAR1-yFsD9jJL2H8Z0-xjQbfo99q4P1ZeSLXgH_m4KnOAvi0eCZDWEhO8xtRPcRkcic8';
    } else {
      config.headers.Authorization = 'DwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNSAwIFI+Pi9FeHRHU3RhdGU8PC9HUzcgNyAwIFIvR1M4IDggMCBSPj4vUHJ';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const { data } = await axiosInstance.post('/refresh-token', { token: refreshToken });
          const newToken = data.token;

          localStorage.setItem('authToken', newToken);
          isRefreshing = false;
          onRefreshed(newToken);
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          return Promise.reject(refreshError);
        }
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addRefreshSubscriber((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });

      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
