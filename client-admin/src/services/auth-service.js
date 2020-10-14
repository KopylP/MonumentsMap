import axios from "axios";
import {
  authErrorRequestInterceptor,
  authRequestInterceptor,
  authResponseInterceptror,
  authErrorResponseInterceptor,
} from "./interceptors/auth-interceptors";
import { clientId } from "../config";

export default class AuthService {
  constructor(host) {
    this._host = host;
    this._baseURL = `${this._host}api/`;
    this._axios = axios.create({
      baseURL: this._baseURL,
      headers: {
        Accept: "*",
      },
    });

    this._axios.interceptors.request.use(
      authRequestInterceptor,
      authErrorRequestInterceptor
    );
    this._axios.interceptors.response.use(
      authResponseInterceptror,
      authErrorResponseInterceptor
    );
  }

  async _getRequest(path, params = {}) {
    let _params = {
      ...params,
    };
    const response = await this._axios.get(path, {
      params: _params,
    });
    return response.data;
  }

  async _postRequest(path, data) {
    const response = await this._axios.post(path, data);
    return response.data;
  }

  getMe = async () => {
    return await this._getRequest(`token/me`);
  };

  auth = async (username, password) => {
    return await this._postRequest('token/auth', {
        username,
        password,
        grant_type: "password",
        client_id: clientId
    });
  }
}
