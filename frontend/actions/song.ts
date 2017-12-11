import { songConstants } from "../constants";
import { Song } from "../reducers/songs";
import * as songService from "../services/song";
import { error, clear } from './';

const getRequest = (songs: Song[]) => ({
    type: songConstants.GET_SONGS,
    songs: songs
});

const getFailure = (err: any) => ({
    type: songConstants.GET_SONGS_FAILURE,
    err: err
});

const getSongs = (token: String) => async (dispatch: any) => {
    dispatch(clear());
    try {
        let resp = await songService.getSongs(token);

        dispatch(getRequest(resp.data));

        // console.log("Got songs");
    } catch (err) {
        // console.log(err);
        dispatch(getFailure(err));
        dispatch(error(err.response.data.message));
        // console.log("Get songs failed");
    }
};

export {
    getSongs
};