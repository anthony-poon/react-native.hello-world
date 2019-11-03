export const SET_CREDENTIAL_ACTION = "native-toolkit/SET_CREDENTIAL_ACTION";
export const UNSET_CREDENTIAL_ACTION = "native-toolkit/UNSET_CREDENTIAL_ACTION";

export function setCredential(jwt) {
    return {
        type: SET_CREDENTIAL_ACTION,
        jwt: jwt
    }
}

export function unsetCredential() {
    return {
        type: UNSET_CREDENTIAL_ACTION,
    }
}