import * as Nominatim from "nominatim-geocoder";
export default class GeocoderService {

    constructor(acceptLanguage) {
        this._acceptLanguage = acceptLanguage;
    }

    _geocoder = new Nominatim({
        secure: true
    });

    
    getLatLngFromAddress = async (address) => {
        const georesponse = await this._geocoder.search({ q: address,});
        if(georesponse.length === 0) return null;
        const { lat, lon } = georesponse[0];
        return { lat, lon };
    }

    getAddressInformationFromLatLng = async (lat, lon) => {
        const georesponse = await this._geocoder.reverse({lat, lon, 'accept-language': this._acceptLanguage});
        return georesponse;
    }
}