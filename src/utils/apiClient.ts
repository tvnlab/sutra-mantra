import { handleRefreshTokenApi } from "@app/services/auth";
import { SessionToken } from "@library/api/dto/user.dto";
import message from "@library/api/utils/message";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { SESSION_KEY } from "./constant";

const BASE_URL = "/api/v1";

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Variable to track whether a token refresh is in progress
let isRefreshing = false;

// Queue for storing requests that are waiting for a refreshed token
let refreshQueue: ((token: string) => void)[] = [];

// Function to process the queued requests with the new token
const processQueue = (token: string) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(SESSION_KEY);
    if (token) {
      const tokenParsed = JSON.parse(token) as SessionToken;
      config.headers.Authorization = `Bearer ${tokenParsed.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<Error>) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === message.error.expired("Access Token")
    ) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const token = localStorage.getItem(SESSION_KEY);
          const tokenParsed = JSON.parse(token) as SessionToken;
          const newToken = await handleRefreshTokenApi(tokenParsed.refreshToken);
          localStorage.setItem(SESSION_KEY, JSON.stringify(newToken));

          // Apply the new token to the original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Retry the original request with the new token
          const response = await axios(originalRequest);

          // Process the queued requests with the new token
          processQueue(newToken.data.accessToken);

          return response;
        } catch (refreshError) {
          // Handle refresh error (e.g., logout user, redirect to login)
          console.error("Token refresh failed:", refreshError);
          // Implement your logout or redirect logic here
          return Promise.reject(refreshError);
        } finally {
          // Reset the flag after token refresh attempt
          isRefreshing = false;
        }
      } else {
        // Token refresh is already in progress, queue the request
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error?.response.data);
  }
);

export default apiClient;
