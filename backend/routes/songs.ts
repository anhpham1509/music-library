import { NextFunction, Request, Response, Router } from "express";
import { Song } from "../models/Song";
// import * as uuid from "uuid";

export class SongsRoute {

    public static create(router: Router) {
        //log
        // console.log("[SongRoute::create] Creating index route.");

        //add songs route
        router.get("/songs", (req: Request, res: Response, next: NextFunction) => {
            new SongsRoute().index(req, res, next);
        });
    }

    public async index(req: Request, res: Response, next: NextFunction) {
        try {
            let songs = await Song.findAll();
            res.status(200).json(songs);
        } catch (err) {
            next(err);
        }
    }
}