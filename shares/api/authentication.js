import {AuthSession} from "expo";

const CLIENT_ID = "ljHJ95TBmNG9aUJQXz2Yst8yv9eEOPTb";
const REDIRECT = AuthSession.getRedirectUrl();
const DOMAIN = "anthony-poon-dev.auth0.com";
class Authentication {

    toQueryString(params) {
        return '?' + Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    async login() {
        const queryParams = this.toQueryString({
            redirect_uri: REDIRECT,
            client_id: CLIENT_ID,
            response_type: 'id_token', // id_token will return a JWT token
            scope: 'openid profile', // retrieve the user's profile
            nonce: 'nonce', // ideally, this will be a random value
        });
        const authUrl = `https://${DOMAIN}/authorize` + queryParams;
        return await AuthSession.startAsync({
            authUrl
        });
    }

    async logout() {
        const queryParams = this.toQueryString({
            client_id: CLIENT_ID,
            returnTo: REDIRECT
        });
        const authUrl = `https://${DOMAIN}/v2/logout` + queryParams;
        return await AuthSession.startAsync({authUrl});
    }
}

export default new Authentication();