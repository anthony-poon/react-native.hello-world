import {SET_CREDENTIAL_ACTION, UNSET_CREDENTIAL_ACTION} from "../actions/auth";
import jwtDecode from "jwt-decode";
import moment from "moment";
const initState = {
    jwt: null,
    name: null,
    avatar: null,
    expireAt: null
};

export default function(state = initState, action) {
    switch (action.type) {
        case SET_CREDENTIAL_ACTION:
            const payload = jwtDecode(action.jwt);
            return {
                ...initState,
                jwt: action.jwt,
                name: payload.name,
                avatar: payload.picture,
                expireAt: moment.unix(payload.exp)
            };
        case UNSET_CREDENTIAL_ACTION:
            return {
                ...initState,
            };
        default:
            return state;
    }
}
