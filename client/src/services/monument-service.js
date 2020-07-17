import axios from "axios";

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

  async _getRequest(path) {
    const response = await this._axios.get(
      path + `?cultureCode=${this._cultureCode}`
    );
    return response.data;
  }

  async _postRequest(path, data) {
    const response = await this._axios.post(path, data);
    return response.data;
  }

  async getAllMonuments() {
    return await this._getRequest("monument/");
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
    return await this._postRequest('monument/', monument);
  }
}
