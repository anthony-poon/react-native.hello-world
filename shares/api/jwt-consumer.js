import {store} from "../../redux/store";

const BASE_URL = "http://192.168.1.196:3000";

export default class JWTConsumer {
    constructor() {
        this._updateJWT();
        store.subscribe(() => this._updateJWT());
    }

    _updateJWT() {
        const state = store.getState();
        this.jwt = state.auth.jwt;
    }

    resolveUrl(path, params) {
        const url = BASE_URL + path;
        return !params ? url : url + '?' + Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    ajaxOption () {
        return {
            contentType: "application/json; charset=utf-8",
            headers: {
                "Authorization": `Bearer ${this.jwt}`,
            },
        }
    }
}