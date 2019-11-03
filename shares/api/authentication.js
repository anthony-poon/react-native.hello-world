import {AuthSession} from "expo";

class Authentication {
    toQueryString(params) {
        return '?' + Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    async login() {
        const redirect = AuthSession.getRedirectUrl();
        console.log(redirect);
        const queryParams = this.toQueryString({
            client_id: "ljHJ95TBmNG9aUJQXz2Yst8yv9eEOPTb",
            redirect_uri: redirect,
            response_type: 'id_token', // id_token will return a JWT token
            scope: 'openid profile', // retrieve the user's profile
            nonce: 'nonce', // ideally, this will be a random value
        });
        const authUrl = `https://anthony-poon-dev.auth0.com/authorize` + queryParams;
        return await AuthSession.startAsync({authUrl});
    }

    async logout() {
        const redirect = AuthSession.getRedirectUrl();
        const queryParams = this.toQueryString({
            client_id: "ljHJ95TBmNG9aUJQXz2Yst8yv9eEOPTb",
            returnTo: redirect
        })
        const authUrl = `https://anthony-poon-dev.auth0.com/v2/logout` + queryParams;
        return await AuthSession.startAsync({authUrl});
    }
}

export default new Authentication();