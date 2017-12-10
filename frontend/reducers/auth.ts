import { authConstants } from '../constants';

export interface Auth {
    name: String;
    email: String;
    token: String;
};

let user: Auth = JSON.parse(localStorage.getItem('user'));
const initialState: Auth = {
    name: "",
    email: "",
    token: ""
};

export const auth = (state: Auth = user ? user : initialState, action: any) => {
    switch (action.type) {
        case authConstants.REGISTER_SUCCESS:
            return action.user;

        case authConstants.REGISTER_FAILURE:
            return initialState;


        case authConstants.LOGIN_SUCCESS:
            return action.user;

        case authConstants.LOGIN_FAILURE:
            return initialState;


        case authConstants.LOGOUT:
            return initialState;

        default:
            return state
    }
}