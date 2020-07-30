import axios from "axios";
import withMonumentService from "../components/hoc-helpers/with-monument-service";

export default class MonumentService {
  constructor(host = "http://localhost:5000/", cultureCode = "uk-UA") {
    this._cultureCode = cultureCode;
    this._host = host;
    this._baseURL = `${this._host}api/`;
    this._axios = axios.create({
      baseURL: this._baseURL,
      headers: {
        Accept: "*",
      },
    });
  }

  async _getRequest(path, withCultureCode = true, params = {}) {
    let _params = {
      ...params
    };
    if(withCultureCode){
      _params["cultureCode"] = this._cultureCode
    }
    const response = await this._axios.get(
      path, {
        params: _params
      }
    );
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
    data.append(
      "file",
      file
    );

    var config = {
      method: "post",
      url: `${this._baseURL}${path}`,
      headers: {
        'Content-Type': 'multipart/form-data',

      },
      data: data,
    };
    const response = await this._axios.request(config);
    return response.data;
  }

  getAllMonuments = async () => {
    return await this._getRequest("monument/");
  }

  /**
   * 
   * @param {*} cities - array of selected cities ids
   * @param {*} statuses - array of selected statuses ids 
   * @param {*} conditions - array of selected conditions ids
   */
  async getMonumentsByFilter(cities, statuses, conditions) {
    return await this._getRequest("monument/filter", true, {
      cities, statuses, conditions
    });
  }

  async getMonumentById(id) {
    return await this._getRequest(`monument/${id}`);
  }

  async getAllStatuses() {
    return await this._getRequest("status/");
  }

  async getAllConditions() {
    return await this._getRequest("condition/");
  }

  async getAllCities() {
    return await this._getRequest("city/");
  }

  async createMonument(monument) {
    return await this._postRequest("monument/", monument);
  }

  deleteMonumentPhoto = async (monumentPhotoId) => {
    return await this._deleteRequest(`monumentphoto/${monumentPhotoId}`);
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
    return await this._patchRequest(`monumentphoto/${monumentPhotoId}/toogle/majorphoto`);
  }

  toogleMonumentAccepted = async (monumentId) => {
    return await this._patchRequest(`monument/${monumentId}/toogle/accepted`);
  }

  getMonumentPhotos = async (monumentId) => {
    return await this._getRequest(`monument/${monumentId}/monumentPhotos`);
  }

  getPhotoLink = (photoId) => {
    return `${this._baseURL}photo/${photoId}/image`;
  }

  getMonumentMonumentPhotoEditable = async (monumentPhotoId) => {
    return await this._getRequest(`monumentphoto/${monumentPhotoId}/editable`, false);
  }
}
