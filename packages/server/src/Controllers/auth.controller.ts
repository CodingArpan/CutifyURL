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
                sameSite: 'none',
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
            // console.log(".....accessToken...... = ", accessToken);

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

    }

    static login = async (req: Request, res: Response): Promise<Response> => {

        try {


            let { email, password }: ({ password: string; email: string; }) = req.body;
            // console.log(email, password);
            const user = await userprofile.findOne({ email }).select('fullname confirmpwd');
            // console.log(user, '....')

            if (user) {
                const pwValidate: boolean = bcrypt.compareSync(password, user.confirmpwd);

                if (pwValidate) {
                    const token: string = utility.createauthtoken(user.fullname, user._id.toString())
                    res.cookie('accesstoken', token, {
                        domain: process.env.COOKIE_DOMAIN,
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        path: '/',
                        sameSite: 'none',
                        secure: true,
                        // signed: true,
                    });
                    // return res.redirect('/user/dashboard');
                    return res.status(200).json({
                        request: 'successfull',
                        authentication: true,
                        message: 'credentials authenticated successfully'
                    })

                } else {
                    res.cookie('accesstoken', '', {
                        domain: process.env.COOKIE_DOMAIN,
                        maxAge: 1000,
                        httpOnly: true,
                        path: '/',
                        sameSite: 'none',
                        secure: true,
                        // signed: true,
                    });
                    return res.status(401).json({
                        request: 'successfull',
                        authentication: false,
                        message: 'Please verify your credentials'
                    })
                }
            } else {
                res.cookie('accesstoken', '', {
                    domain: process.env.COOKIE_DOMAIN,
                    maxAge: 1000,
                    httpOnly: true,
                    path: '/',
                    sameSite: 'none',
                    secure: true,
                    // signed: true,
                });
                return res.status(401).json({
                    request: 'successfull',
                    authentication: false,
                    message: 'Please verify your credentials'
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                request: 'failed',
                authentication: false,
                message: 'Internal Server Error'
            })
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
                sameSite: 'none',
                secure: true,
                // signed: true,
            });
            return res.status(200).json({
                request: 'successfull',
                authentication: false,
                message: 'Logged out successfully'
            })
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                request: 'failed',
                authentication: false,
                message: 'Internal Server Error'
            })
        }
    }

    static resetPasswordRequest = async (req: Request, res: Response): Promise<Response> => {
        console.log(req.body, ".....forget password.....");
        try {
            const { email }: ({ email: string; }) = req?.body;

            let emailindb = await utility.checkEmail(email);
            if (emailindb.status) {
                const sendingEmail = await utility.sendResetPasswordEmail(emailindb);
                if (sendingEmail) {
                    return res.status(200).json({
                        emailindb: true,
                        type: "Reset Password Email Sent",
                        message: 'Please Check your email, a password reset link has been sent to your email'
                    })
                } else {
                    return res.status(401).json({
                        emailindb: false,
                        type: "email not found",
                        message: 'This email is not associated with any account'
                    })
                }
            } else {
                return res.status(401).json({
                    emailindb: false,
                    type: "email not found",
                    message: 'This email is not associated with any account'
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(401).json({
                emailindb: false,
                type: "email not found",
                message: 'Internal Server Error'
            })
        }
    }


    static changePassword = async (req: Request, res: Response): Promise<Response> => {
        console.log(req.body, ".....change password.....");
        try {
            const { password,
                confirm_password,
                resetid }: ({
                    password: string;
                    confirm_password: string;
                    resetid: string;
                }) = req?.body;
            const validate = await utility.authenticateToken(resetid);
            console.log(validate, '......')
            if (validate.authtoken) {
                var salt: string = bcrypt.genSaltSync(10);
                var hash: string = bcrypt.hashSync(confirm_password, salt);
                const uniqID = validate?.userdata?.ref;

                const updated = await userprofile.findOneAndUpdate({ _id: uniqID }, { $set: { confirmpwd: hash } })
                console.log(updated, '......update done........');

                if (updated) {
                    return res.status(200).json({
                        action: true,
                        type: "Password Changed",
                        message: 'Password Changed Successfully'
                    })
                } else {
                    return res.status(401).json({
                        action: false,
                        type: "Password Not Changed",
                        message: 'Internal Server Error'
                    })
                }
            } else {
                return res.status(401).json({
                    action: false,
                    type: "Password Not Changed",
                    message: 'Your session link has expired, please try again'
                })
            }

            

        } catch (error) {
            console.log(error);
            return res.status(401).json({
                action: false,
                type: "Password Not Changed",
                message: 'Internal Server Error'
            })
        }
    }





}