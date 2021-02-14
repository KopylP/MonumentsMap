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

  if(error == null || error.response.status == null) return Promise.reject(error);

  const isUnauthorisedGet = error.response.status === 401;
  const isUnauthorisedPost = error.response.status === 405 
    && (error.response.headers["www-authenticate"] 
    && error.response.headers["www-authenticate"].includes("invalid_token"));

  const isUnauthorisedError = isUnauthorisedGet || isUnauthorisedPost;

  if (
    (isUnauthorisedError &&
      originalRequest.url === `token/auth`)
  ) {
    return Promise.reject(error);
  }


  if (isUnauthorisedError && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorageService.getRefreshToken();
    return axios
      .post(`${serverHost}api/token/auth`, {
        refresh_token: refreshToken,
        client_id: clientId,
        grant_type: "refresh_token"
      })
      .then((res) => {
        if (res.status === 200) {
          localStorageService.setToken(res.data);
          originalRequest.headers["Authorization"] =
            "Bearer " + localStorageService.getAccessToken();
          
          return axios.request(originalRequest);
        }
      });
  }
  return Promise.reject(error);
};
