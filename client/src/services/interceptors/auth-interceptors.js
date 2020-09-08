import LocalStorageService from "../local-storage-service";
import axios from "axios";
import { serverHost, clientId } from "../../config";

const localStorageService = LocalStorageService.getService();

//request interceptor

export const authRequestInterceptor = (config) => {
  const token = localStorageService.getAccessToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
};
export const authErrorRequestInterceptor = (error) => {
  Promise.reject(error);
};

//Add a response interceptor

export const authResponseInterceptror = (response) => {
  return response;
};

export const authErrorResponseInterceptor = function (error) {
  const originalRequest = error.config;
  if(error == null || error.status == null) return Error();
  if (
    (error.response.status === 401 &&
      originalRequest.url === `${serverHost}api/token/auth`)
  ) {
    return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorageService.getRefreshToken();
    return axios
      .post(`${serverHost}api/token/auth`, {
        refresh_token: refreshToken,
        client_id: clientId,
      })
      .then((res) => {
        if (res.status === 201) {
          localStorageService.setToken(res.data);
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorageService.getAccessToken();
          return axios(originalRequest);
        }
      });
  }
  return Promise.reject(error);
};
