import axios from "axios";
import { googleMapsKey } from "../config";

export default class GoogleMapsService {
    _baseUrl = 'https://maps.googleapis.com/maps/api/';

    _axios = axios.create({
        baseURL: this._baseURL,
        headers: {
          Accept: "*",
        },
    });

    async _getRequest(path) {
        const response = await this._axios.get(path);
        return response.data;
    }

    getLatLngFromAddress = async (address) => {
        const formattedAddress = address.replace(' ', '+');
        const { results } = await this._getRequest(`json?address=${formattedAddress}&key=${googleMapsKey}`);
        if(results.length === 0) return null;
        return results[0].geometry.location;
    }

    getAddressFromLatLng = async (lat, lng) => {
        const { results } = await this._getRequest(`json?latlng=${lat},${lng}key=${googleMapsKey}`);
        if(results.length === 0) return null;
        return results[0].formatted_address;
    }
}