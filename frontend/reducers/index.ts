import { combineReducers } from "redux";
import { auth } from "./auth";
import { songs } from "./songs";
import { alert } from "./alert";

export const reducers = combineReducers({
    auth,
    songs,
    alert
});