import { NextFunction, Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";

export class Authorisation {

    public static create(router: Router) {
        // console.log("[Authorisation Middleware::create] Creating authorisation middleware.");

        router.use((req: Request, res: Response, next: NextFunction) => {
            new Authorisation().middleware(req, res, next);
        });
    }

    public async middleware(req: Request, res: Response, next: NextFunction) {
        const token = req.header("Authorization");
        // console.log(token);
        if (token != "") {
            jwt.verify(token, "SECRET", (err, decoded) => {
                if (err != null) {
                    // console.log(err);
                    res.json({ message: "Invalid token!!" });
                } else {
                    // console.log(decoded);
                    next();
                }
            });
            return;
        }
        return res.status(401).json({ message: "Empty token!!" });
    }
}