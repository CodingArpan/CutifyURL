import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import shortUrl, { Shorturl_temp } from "../Models/miniURL.model";
import userData, { userdata_temp } from "../Models/userdata.model";
import userprofile, { createprofile_temp } from '../Models/user.profile.model';
import utility from "../Middlewares/utility";
import { authenticateTokenReturnType } from "../Interfaces/interfaces";
// import { boolean } from "yup";


export default class authenticate {

    static registration = async (req: Request, res: Response): Promise<Response> => {

        try {
            let { fullname,
                email,
                mobile,
                password,
                confirm_password }: (
                    createprofile_temp &
                    {
                        password: string;
                        confirm_password: string;
                    } & Omit<createprofile_temp, 'confirmpwd'>
                ) = req.body;

            var salt: string = bcrypt.genSaltSync(10);
            var hash: string = bcrypt.hashSync(confirm_password, salt);
            const saved: (createprofile_temp & { _id: object; }) = await userprofile.create({ fullname, email, mobile, confirmpwd: hash })
            console.log(saved)

            const token: string = utility.createauthtoken(saved.fullname, saved._id.toString())

            res.cookie('accesstoken', token, {
                domain: process.env.COOKIE_DOMAIN,
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                secure: true,
                // signed: true,
            });
            // return res.redirect('/user/dashboard');

            return res.status(200).json({
                registration: true,
                status: 'success',
                type: "profile created",
                message: 'Your Profile created successfully'
            })

        } catch (err: any) {
            console.log({ ...err });
            if (err.code === 11000) {
                return res.status(409).json({
                    registration: false,
                    status: 'warning',
                    type: 'duplicate',
                    message: "This email or mobile is associated with another account",
                    list: err.keyValue
                })
            }

            return res.status(500).json({
                registration: false,
                status: 'error',
                type: 'exception',
                message: 'Internal Server Error',
                list: []

            })
        }
    }

    static accessToken = async (req: Request, res: Response): Promise<Response> => {

        try {
            const accessToken: string | undefined = req?.headers?.cookie?.split('=')[1] ?? undefined;
            console.log(accessToken, '........')
            if (accessToken) {
                const authentication: authenticateTokenReturnType = utility.authenticateToken(accessToken);
                console.log(authentication, '...')
                if (authentication.authtoken) {
                    return res.status(200).json({
                        authentication: authentication.authtoken,
                        message: 'session active',
                        userdata: authentication.userdata
                    })
                } else {
                    return res.status(401).json({
                        authentication: authentication.authtoken,
                        message: 'session expired, please sign in again',
                        userdata: authentication.userdata
                    })
                }
            } else {
                return res.status(401).json({
                    authentication: false,
                    message: 'session expired, please sign in again',
                    userdata: null

                })
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                authentication: false,
                message: 'session expired, please sign in again',
                userdata: null

            })
        }

        return res.status(200).json({ request: 'successfull', authentication: true, message: 'credentials authenticated successfully' });
    }

    static login = async (req: Request, res: Response): Promise<Response> => {

        try {


            let { email, password }: ({ password: string; email: string; }) = req.body;
            console.log(email, password);
            const user = await userprofile.findOne({ email }).select('fullname confirmpwd');
            console.log(user, '....')

            if (user) {
                const pwValidate: boolean = bcrypt.compareSync(password, user.confirmpwd);

                if (pwValidate) {
                    const token: string = utility.createauthtoken(user.fullname, user._id.toString())
                    res.cookie('accesstoken', token, {
                        domain: process.env.COOKIE_DOMAIN,
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        path: '/',
                        sameSite: 'strict',
                        secure: true,
                        // signed: true,
                    });
                    // return res.redirect('/user/dashboard');
                    return res.status(200).json({ request: 'successfull', authentication: true, message: 'credentials authenticated successfully' })

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
                    return res.status(401).json({ request: 'successfull', authentication: false, message: 'Please verify your credentials' })
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
                return res.status(401).json({ request: 'successfull', authentication: false, message: 'Please verify your credentials' })
            }

        } catch (error) {
            console.log(error)
            return res.status(401).json({ request: 'failed', authentication: false, message: 'Internal Server Error' })
        }



    }

    static logout = async (req: Request, res: Response): Promise<Response> => {
        console.log(req.body, ".....logout.....");
        try {
            res.cookie('accesstoken', '', {
                domain: process.env.COOKIE_DOMAIN,
                maxAge: 1000,
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                secure: true,
                // signed: true,
            });
            return res.status(200).json({ request: 'successfull', authentication: false, message: 'Logged out successfully' })
        } catch (error) {
            console.log(error)
            return res.status(401).json({ request: 'failed', authentication: false, message: 'Internal Server Error' })
        }
    }

}