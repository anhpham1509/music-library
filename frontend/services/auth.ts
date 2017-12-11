import { LoginParams, RegisterParams } from "../actions";
import axios, {AxiosRequestConfig} from "axios";
import { HttpRequest } from "../network/http";

const login = async (params: LoginParams) => {
    return axios(HttpRequest.Post("/auth/login", params, ""));
};

const logout = () => {
    localStorage.removeItem('user');
};

const register = (params: RegisterParams) => {
    return axios(HttpRequest.Post("/auth/register", params, ""))
};

export {
    login,
    logout,
    register
};