import {store} from "../../redux/store";
import ENV from "../env";

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
        const url = ENV.END_POINT_URL + path;
        return !params ? url : url + '?' + Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    ajaxOption () {
        return {
            headers: {
                "Authorization": `Bearer ${this.jwt}`,
                "Content-Type": "application/json; charset=utf-8",
            },
        }
    }
}