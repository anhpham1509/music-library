import axios from "axios";
import { HttpRequest } from "../network/http";

const getSongs = async (token: String) => {
    return axios(HttpRequest.Get("/songs", token));
};

export {
    getSongs
};