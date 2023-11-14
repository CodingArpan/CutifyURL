import { Request, Response, NextFunction } from "express";
import nodemailer from 'nodemailer';
import mongoose from "mongoose"
import shortUrl from "../Models/miniURL.model"
import userprofile from "../Models/user.profile.model";
import { authenticateTokenReturnType } from "../Interfaces/interfaces";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
let jwtkey: string | undefined = process.env.JWT_SECRET;
if (!jwtkey) {

    jwtkey = 'Rfd!$%bJeUQpZ^uPPGiyYvdaESoB&jR*PZTt9EtueEJK7KZK5pbS8r32h!Poc8$2jf6FM8jgkRsE!YN9aE3z3$3DmnRZJ@nUv';
}

interface sendPwdResetLinkType {
    url: string;
    email: string;
}
interface EmailData {
    status: boolean;
    data: {
        _id?: mongoose.Types.ObjectId;
        fullname?: string;
        email?: string;
    };
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

    static checkEmail = async (email: string): Promise<EmailData> => {
        try {
            const find = await userprofile.find({ email }).select('_id fullname email')
            console.log(find)
            if (find.length) {
                return {
                    status: true,
                    data: find[0]
                }
            } else {
                return {
                    status: true,
                    data: {}
                };
            }
        } catch (error) {
            console.log(error);
            return {
                status: true,
                data: {}
            };

        }
    }

    static createauthtoken = (name: string, ref: string, expiry: number | string = 60 * 60): string => {

        const authToken = jwt.sign({
            data: { name, ref }
        }, jwtkey!, { expiresIn: expiry });
        // console.log(authToken)
        return authToken;
    }

    static authenticateToken = (accesstoken: string): authenticateTokenReturnType => {

        try {
            let decoded: string | any = jwt.verify(accesstoken, jwtkey!);
            console.log(decoded.data)
            let status: authenticateTokenReturnType = {
                authtoken: true,
                userdata: decoded.data
            }
            return status;
        } catch (err) {
            console.log(err, '................')
            let status: authenticateTokenReturnType = {
                authtoken: false,
                userdata: {}
            }
            return status
        }
    }

    static verifyAuthTokenOptional = (req: Request, res: Response, next: NextFunction): void => {
        const accessToken: string | undefined = req?.headers?.cookie?.split('=')[1] ?? undefined;

        // console.log(req?.headers)
        console.log("accessToken = " + accessToken)
        if (accessToken) {
            const authentication: authenticateTokenReturnType = this.authenticateToken(accessToken);
            // console.log(authentication, '...')
            if (authentication.authtoken) {
                req.body.login = authentication.authtoken;
                req.body.userid = authentication?.userdata?.ref;
                console.log(req.body)
                next()
            } else {

                next()
            }
        } else {

            next()
        }

    }

    static verifyAuthTokenMandatory = (req: Request, res: Response, next: NextFunction): Response | void => {
        const accessToken: string | undefined = req?.headers?.cookie?.split('=')[1] ?? undefined;

        if (accessToken) {
            const authentication: { authtoken: boolean; userdata: any; } = this.authenticateToken(accessToken);
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

    static sendpwdresetlink = async ({ url, email }: sendPwdResetLinkType) => {

        try {

            const sender = process.env.SENDER_EMAIL;
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASS,
                }
            });

            const mailOptions = {
                from: `CutifyURL Team <${sender}>`,
                to: email,
                subject: 'Password Reset Link',
                html: `<div class="modal" style=" width: 100%;
            max-width: 500px;
            background: white;
            margin: 20px auto;
            border-radius: 20px;
            padding: 30px 0px;">
                <p class="heading" style="  margin: 20px 0;
                font-size: 1.8rem;
                font-weight: bold;
                color: #506bec;
                letter-spacing:0.5px;
                font-family: 'Rubik', sans-serif;">Forgot your password?</p>
                <p class="para" style="  margin: 20px 0;
      font-size: 1rem;
      font-weight: 200;
      font-family: sans-serif;
      color: #525050;">Hey, we received a request to reset your password.</p>
                <p class="para" style="  margin: 20px 0;
      font-size: 1rem;
      font-weight: 200;
      font-family: sans-serif;
      color: #525050;">Let’s get you a new one!</p>
    
                <a href=${url} target="_blank" style="text-decoration: none;">
                    <div class="button" style="font-family: sans-serif;
                    width: fit-content;
                    padding: 15px 30px;
                    margin: 40px 0;
                    border: unset;
                    border-radius: 15px;
                    color: white;
                    z-index: 1;
                    background: #506bec;
                    position: relative;
                    font-weight: 600;
                    font-size: 1rem;
                    letter-spacing: 0.5px;
                    box-shadow: 1px 1px 20px 3px #9ea3ff;
                    overflow: hidden;">Reset My Password</div>
                </a>
    
                
                <p class="para" style="  margin: 20px 0;
      font-size: 1rem;
      font-weight: 200;
      font-family: sans-serif;
      color: #525050;">Didn’t request a password reset? You can ignore this message.</p>
                <p class="para" style="  margin: 20px 0;
      font-size: 1rem;
      font-weight: 200;
      font-family: sans-serif;
      color: #525050;">It is valid for only 15 minutes.</p>
    
            </div>`
            };

            const info = await transporter.sendMail(mailOptions)
            console.log(info)

            return info.accepted.length && info.messageId ? true : false;

        } catch (error) {
            console.log(error);
            return false;

        }

    }


    static sendResetPasswordEmail = async (EmailData: EmailData): Promise<boolean> => {
        try {
            if (!EmailData.status) {
                throw new Error('Email not found')
            } else {
                const { _id, fullname, email }: EmailData["data"] = EmailData?.data;
                const pwdresetoken = this.createauthtoken(fullname!, _id!.toString(), 60 * 15);
                let uiURL = JSON.parse(JSON.stringify(process.env.WHITELISTORIGINS));
                let washedUrl = uiURL.replaceAll(/[\[\'\"\]]+/g, '');
                console.log(typeof uiURL, "----------------", washedUrl);
                const reseturl = `${washedUrl}/changepwd/${pwdresetoken}`;
                console.log("........reseturl......", reseturl);
                return await this.sendpwdresetlink({ url: reseturl, email: email! }) ? true : false;
            }


        } catch (error) {
            console.log(error);
            return false;

        }
    }
}


