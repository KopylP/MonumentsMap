import axios from "axios";
import { googleMapsKey } from "../config";
import * as GoogleMaps from "@google/maps";

export default class GoogleMapsService {

    _googleMapsClient = GoogleMaps.createClient({
        key: googleMapsKey,
        Promise: Promise
    });
    
    getLatLngFromAddress = async (address) => {
        const response = await this._googleMapsClient.geocode({address}).asPromise();
        const { results } = response.json;
        if(results.length === 0) return null;
        return results[0].geometry.location;
    }

    getAddressFromLatLng = async (lat, lng) => {
        const response = await this._googleMapsClient.geocode({latlng: `${lat},${lng}`}).asPromise();
        const { results } = response.json;
        if(results.length === 0) return null;
        return results[0].formatted_address;
    }
}