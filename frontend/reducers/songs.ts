import { songConstants } from "../constants";

export interface Song {
    artist: string;
    title: string;
    cover: string;
    url: string;
}

const initialState: Song[] = [];

export const songs = (state: Song[] = initialState, action: any) => {
    switch (action.type) {
        case songConstants.GET_SONGS:
            return action.songs;

        case songConstants.GET_SONGS_FAILURE:
            return initialState;

        case songConstants.ADD_SONG:
            return action.songs;

        case songConstants.UPDATE_SONG:
            return initialState;

        case songConstants.REMOVE_SONG:
            return initialState;

        default:
            return state
    }
}