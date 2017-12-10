import { NextFunction, Request, Response, Router } from "express";
import { User } from "../models/User";

import { isValidLoginParams, isValidRegisterParams } from "../helpers/validations";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as uuid from "uuid";

export class AuthRoute {

    public static create(router: Router) {
        // console.log("[AuthRoute::create] Creating auth routes.");

        router.post("/auth/login", (req: Request, res: Response, next: NextFunction) => {
            new AuthRoute().login(req, res, next);
        });

        router.post("/auth/register", (req: Request, res: Response, next: NextFunction) => {
            new AuthRoute().register(req, res, next);
        });
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        if (!isValidLoginParams(req.body)) {
            console.log(req.body);
            res.status(400);
            return;
        }

        // find by email
        try {
            let user = await User.findOne({ where: { email: req.body.email } })
            if (user != null) {
                // compare password
                bcrypt.compare(req.body.password, user.password, (err, ok) => {
                    if (ok) {
                        jwt.sign({
                            user: user.id,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60)
                        }, "SECRET", (err, token) => {
                            // return token
                            res.status(200).json({
                                name: user.name,
                                token: token
                            });
                        });

                        return;
                    }

                    res.status(401).json({ message: "Wrong password" });
                });

                return;
            }

            res.status(401).json({ message: "User not found" });

        } catch (err) {
            next(err);
        }
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        // validate email & password & name
        if (!isValidRegisterParams(req.body)) {
            console.log(req.body);
            res.status(400);
            return;
        }

        // find by email --> unique
        try {
            let user = await User.findOne({ where: { email: req.body.email } })

            if (user != null) {
                res.status(409).json({ message: "Email already taken" });
                return;
            }

            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                let user = await User.create({
                    id: uuid.v1(),
                    email: req.body.email,
                    password: hash,
                    name: req.body.name
                });

                jwt.sign({
                    user: user.id,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60)
                }, "SECRET", (err, token) => {
                    // return token
                    res.status(200).json({
                        name: user.name,
                        token: token
                    });
                });
            })
        }
        catch (err) {
            next(err);
        };
    }
}