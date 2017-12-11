import { authConstants } from "../constants/index";
import { Auth } from "../reducers/auth";
import { history } from "../configs/browser";
import * as authService from "../services/auth";
import { error, clear } from './';

export interface LoginParams {
    email: String;
    password: String;
};

export interface RegisterParams {
    name: String;
    email: String;
    password: String;
};

const loginSuccess = (auth: Auth) => (
    {
        type: authConstants.LOGIN_SUCCESS,
        user: auth
    }
);

const loginFailure = (err: any) => (
    {
        type: authConstants.LOGIN_FAILURE,
        err: err
    }
);

const registerSuccess = (auth: Auth) => (
    {
        type: authConstants.REGISTER_SUCCESS,
        user: auth
    }
);

const registerFailure = (err: any) => (
    {
        type: authConstants.REGISTER_FAILURE,
        err: err
    }
);

const register = (params: RegisterParams) => async (dispatch: any) => {
    dispatch(clear());
    try {
        let resp = await authService.register(params);
        let user = {
            name: params.name,
            email: params.email,
            token: resp.data.token
        };

        localStorage.setItem('user', JSON.stringify(user));
        dispatch(registerSuccess(user));

        // console.log("Registered successfully");
        history.push("/")
    } catch (err) {
        dispatch(registerFailure(err));
        dispatch(error(err.response.data.message));
        // console.log("Registration failed");
    }
};

const login = (params: LoginParams) => async (dispatch: any) => {
    dispatch(clear());
    try {
        let resp = await authService.login(params);
        let user = {
            name: resp.data.name,
            email: params.email,
            token: resp.data.token
        };

        localStorage.setItem('user', JSON.stringify(user));
        dispatch(loginSuccess(user));

        // console.log("Logged in success");
        history.push("/")
    } catch (err) {
        dispatch(loginFailure(err));
        // console.log(err);
        dispatch(error(err.response.data.message));
        // console.log("Logged in failed");
    }
};

const logout = () => {
    authService.logout();
    
    return {
        type: authConstants.LOGOUT
    }
};

export {
    login,
    logout,
    register
};