import axiosInstance from "../api/axios";
import type { RequestInterceptor, ResponseInterceptor } from "../api/types";
import { refreshToken } from "./authService";

let accessToken: string | null = null;
let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(token: string) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const authRequestInterceptor: RequestInterceptor = {
  onFulfilled: (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
};

export const authResponseInterceptor: ResponseInterceptor = {
  onFulfilled: (res) => res,
  onRejected: async (error) => {
    const originalRequest = error.config;

    if (
      !error.response ||
      !originalRequest ||
      originalRequest.method === "options" ||
      error.config?.url === "/auth/refresh"
    ) {
      return Promise.reject(error);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        setAccessToken(newToken);
        onTokenRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        setAccessToken(null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
};
