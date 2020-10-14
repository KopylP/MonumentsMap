import axios from "axios";
import {
  authRequestInterceptor,
  authErrorRequestInterceptor,
  authResponseInterceptror,
  authErrorResponseInterceptor,
} from "./interceptors/auth-interceptors";

const CancelToken = axios.CancelToken;

export default class MonumentService {
  constructor(host, cultureCode = "uk-UA") {
    this._cultureCode = cultureCode;
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

  async _getRequest(
    path,
    withCultureCode = true,
    params = {},
    cancelCallback = (p) => p
  ) {
    let _params = {
      ...params,
    };
    if (withCultureCode) {
      _params["cultureCode"] = this._cultureCode;
    }
    const response = await this._axios.get(path, {
      params: _params,
      cancelToken: new CancelToken(function executor(c) {
        cancelCallback(c);
      }),
    });
    return response.data;
  }

  async _postRequest(path, data) {
    const response = await this._axios.post(path, data);
    return response.data;
  }

  async _putRequest(path, data) {
    const response = await this._axios.put(path, data);
    return response.data;
  }

  async _patchRequest(path, data) {
    const response = await this._axios.patch(path, data);
    return response.data;
  }

  async _deleteRequest(path) {
    const response = await this._axios.delete(path);
    return response.data;
  }

  async _postFormRequest(path, file) {
    const data = new FormData();
    data.append("file", file);

    var config = {
      method: "post",
      url: `${this._baseURL}${path}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    const response = await this._axios.request(config);
    return response.data;
  }

  getAllMonuments = async (hidden = true) => {
    return await this._getRequest(`monument/`, true, { hidden });
  };

  /**
   *
   * @param {*} cities - array of selected cities ids
   * @param {*} statuses - array of selected statuses ids
   * @param {*} conditions - array of selected conditions ids
   */
  async getMonumentsByFilter(cities, statuses, conditions, yearsRange, cancelCallback) {
    return await this._getRequest(
      "monument/filter",
      true,
      {
        cities,
        statuses,
        conditions,
        startYear: yearsRange[0],
        endYear: yearsRange[1]
      },
      cancelCallback
    );
  }

  getMonumentById = async (id) => {
    return await this._getRequest(`monument/${id}`);
  }

  getAllStatuses = async () => {
    return await this._getRequest("status/");
  }

  getAllConditions = async () => {
    console.log("All conditions");
    return await this._getRequest("condition/");
  }

  getAllCities = async () => {
    return await this._getRequest("city/");
  }

  createMonument = async (monument) => {
    return await this._postRequest("monument/", monument);
  }

  editMonument = async (monument) => {
    return await this._putRequest("monument/", monument);
  }

  toogleMonumentAccepted = async (monumentId) => {
    return await this._patchRequest(`monument/${monumentId}/toogle/accepted`);
  }

  getEditableMonument = async (monumentId) => {
    return await this._getRequest(`monument/${monumentId}/editable`);
  }

  deleteMonument = async (monumentId) => {
    return await this._deleteRequest(`monument/${monumentId}`);
  }

  deleteMonumentPhoto = async (monumentPhotoId) => {
    return await this._deleteRequest(`monumentphoto/${monumentPhotoId}`);
  };

  getMonumentPhoto = async (monumentPhotoId) => {
    return await this._getRequest(`monumentphoto/${monumentPhotoId}`);
  };

  getParticipants = async () => {
    return await this._getRequest(`participant`);
  }

  getMonumentRawParticipants = async (monumentId) => {
    return await this._getRequest(`monument/${monumentId}/participants/raw`);
  }

  editMonumentParticipants = async (monumentId, participantsList) => {
    return await this._patchRequest(`monument/${monumentId}/participants`, participantsList);
  }

  async savePhoto(photo) {
    return await this._postFormRequest("photo/", photo);
  }

  async createPhotoMonument(monumentPhoto) {
    return await this._postRequest("monumentphoto/", monumentPhoto);
  }

  async editPhotoMonument(monumentPhoto) {
    return await this._putRequest("monumentphoto/", monumentPhoto);
  }

  async getPhotoIds(monumentId) {
    return await this._getRequest(`monument/${monumentId}/photo/ids`);
  }

  toogleMonumentMajorPhoto = async (monumentPhotoId) => {
    return await this._patchRequest(
      `monumentphoto/${monumentPhotoId}/toogle/majorphoto`
    );
  };

  toogleMonumentAccepted = async (monumentId) => {
    return await this._patchRequest(`monument/${monumentId}/toogle/accepted`);
  };

  getMonumentPhotos = async (monumentId) => {
    return await this._getRequest(`monument/${monumentId}/monumentPhotos`);
  };

  getPhotoLink = (photoId, size) => {
    return `${this._baseURL}photo/${photoId}/image${size ? "/" + size : ""}`;
  };

  getMonumentMonumentPhotoEditable = async (monumentPhotoId) => {
    return await this._getRequest(
      `monumentphoto/${monumentPhotoId}/editable`,
      false
    );
  };

  getParticipants = async () => {
    return await this._getRequest(`participant`);
  };

  getEditableParticipant = async (participantId) => {
    return await this._getRequest(`participant/${participantId}/editable`);
  };

  deleteParticipant = async (participantId) => {
    return await this._deleteRequest(`participant/${participantId}`);
  };

  editParticipant = async (participant) => {
    return await this._putRequest(`participant`, participant);
  }

  createParticipant = async (participant) => {
    return await this._postRequest(`participant`, participant);
  }

  getMe = async () => {
    return await this._getRequest(`token/me`, false);
  };

  getUsers = async () => {
    return await this._getRequest(`user`, false);
  }

  getUser = async (userId) => {
    return await this._getRequest(`user/${userId}`, false);
  }

  deleteUser = async (userId) => {
    return await this._deleteRequest(`user/${userId}`);
  }

  getUserRoles = async (userId) => {
    return await this._getRequest(`user/${userId}/roles`);
  }

  inviteUser = async (email) => {
    return this._postRequest('registration/invite', { email });
  }

  registerUser = async (registerModel) => {
    return this._postRequest('registration', registerModel);
  }

  changeUserRoles = async (userId, userRoleModel) => {
    return this._postRequest(`user/${userId}/roles`, userRoleModel);
  }
}
