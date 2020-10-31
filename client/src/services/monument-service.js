import axios from "axios";

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
    return await this._getRequest("condition/");
  }

  getAllCities = async () => {
    return await this._getRequest("city/");
  }

  getMonumentPhoto = async (monumentPhotoId) => {
    return await this._getRequest(`monumentphoto/${monumentPhotoId}`);
  };

  getParticipants = async () => {
    return await this._getRequest(`participant`);
  }

  getMonumentRawParticipants = async (monumentId) => {
    return await this._getRequest(`monument/${monumentId}/participants/raw`);
  }

  async getPhotoIds(monumentId) {
    return await this._getRequest(`monument/${monumentId}/photo/ids`);
  }


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
}
