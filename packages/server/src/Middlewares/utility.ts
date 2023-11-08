import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose"
import shortUrl from "../Models/miniURL.model"
import userprofile from "../Models/user.profile.model";

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
let jwtkey: string | undefined = process.env.JWT_SECRET;
if (!jwtkey) {

    jwtkey = 'Rfd!$%bJeUQpZ^uPPGiyYvdaESoB&jR*PZTt9EtueEJK7KZK5pbS8r32h!Poc8$2jf6FM8jgkRsE!YN9aE3z3$3DmnRZJ@nUv';
}

export default class utility {

    static checkavailablity = async (keyword: string): Promise<boolean> => {
        try {

            const find = await shortUrl.find({ keyword });
            // console.log(find)
            if (find.length || keyword.length < 4) {
                return true
            } else {
                return false
            }

        } catch (error) {
            console.log(error)
            return true

        }
    }

    static createUrlId = (secure: boolean): () => Promise<string | Error> => {

        const ID = async (): Promise<string | Error> => {
            try {
                // const security = secure ? 'S' : 'NS';
                const newID = Date.now().toString(36);
                const find = await shortUrl.find({ keyword: newID })

                if (find.length) {
                    ID()
                }
                return newID;
            } catch (error) {
                return new Error('Can not create URL ID')
            }

        }
        return ID;
    }

    static checkEmail = async (email: string): Promise<boolean | Error> => {

        const find = await userprofile.find({ email });

        // console.log(find)
        if (find.length || email.length < 8) {
            return true
        } else {
            return false
        }
    }

    static createauthtoken = (name: string, ref: string): string => {

        const authToken = jwt.sign({
            data: { name, ref }
        }, jwtkey!, { expiresIn: 60 * 60 });
        // console.log(authToken)
        return authToken;
    }

    static authenticatetoken = (accesstoken: string): { authtoken: boolean; userdata: any; } => {

        try {
            let decoded: string | any = jwt.verify(accesstoken, jwtkey!);
            console.log(decoded.data)
            let status = {
                authtoken: true,
                userdata: decoded.data
            }
            return status;
        } catch (err) {
            console.log(err, '................')
            let status = {
                authtoken: false,
                userdata: null
            }
            return status
        }
    }

    static verifyauthtoken_optional = (req: Request, res: Response, next: NextFunction): void => {
        const headers: string = JSON.stringify(req.headers);
        const parsedHeaders = JSON.parse(headers);
        // console.log(parsedHeaders)
        if (parsedHeaders.accesstoken && parsedHeaders.credentials === 'include') {
            const authentication: { authtoken: boolean; userdata: any; } = this.authenticatetoken(parsedHeaders.accesstoken);
            // console.log(authentication, '...')
            if (authentication.authtoken) {
                req.body.login = authentication.authtoken
                req.body.userid = authentication.userdata.ref
                next()
            } else {

                next()
            }
        } else {

            next()
        }

    }

    static verifyauthtoken_mandatory = (req: Request, res: Response, next: NextFunction): Response | void => {
        const headers: string = JSON.stringify(req.headers);
        const parsedHeaders = JSON.parse(headers);
        if (parsedHeaders.accesstoken && parsedHeaders.credentials === 'include') {
            const authentication: { authtoken: boolean; userdata: any; } = this.authenticatetoken(parsedHeaders.accesstoken)
            if (authentication.authtoken) {
                req.body.login = authentication.authtoken;
                req.body.userid = authentication.userdata.ref;
                next()

            } else {
                res.cookie('accesstoken', '', {
                    domain: process.env.COOKIE_DOMAIN,
                    maxAge: 1000,
                    httpOnly: true,
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    // signed: true,
                });
                return res.status(401).json({
                    authentication: 'failed',
                    message: 'session expired, please sign in again'
                })
            }
        } else {
            res.cookie('accesstoken', '', {
                domain: process.env.COOKIE_DOMAIN,
                maxAge: 1000,
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                secure: true,
                // signed: true,
            });
            return res.status(401).json({
                authentication: 'failed',
                message: 'To use this service please sign-in to your account'
            })
        }

    }
}