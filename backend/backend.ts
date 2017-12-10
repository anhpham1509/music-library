import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as errorHandler from "errorhandler";
import { sequelize } from "./sequelize";
import { NextFunction, Request, Response } from "express";

import { Authorisation } from "./middleware/authorisation";
import { AuthRoute } from "./routes/auth";
import { SongsRoute } from "./routes/songs";

export class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }

    public api() {
        //empty for now
    }

    public config() {
        //add static paths TO FRONTEND
        this.app.use(express.static(path.join(__dirname, "public")));

        //mount logger
        this.app.use(logger("dev"));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());

        // test db connection
        sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }

    private routes() {
        let router: express.Router;
        router = express.Router();

        // Routes
        AuthRoute.create(router);

        // Middleware
        Authorisation.create(router);

        // Routes
        SongsRoute.create(router);

        // Use router
        this.app.use('/api/', router);

        // Serve frontend
        this.app.all("/*", (req: Request, res: Response, next: NextFunction) => {
            res.sendFile(path.resolve(__dirname, "public", "index.html"));
        });
    }
}
