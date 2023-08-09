import * as yup from 'yup';
import { Request, Response, NextFunction } from "express";

export default class validation {

    static shorturlrequest = (req: Request, res: Response, next: NextFunction): void => {

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let schema = yup.object().shape({ destination: yup.string().min(13, 'URL must be atleast 13 characters long').url().required(), custom: yup.boolean().required(), keyword: yup.string().when('custom', { is: true, then: yup.string().min(4, 'keyword must be atleast 4 characters long').required(), otherwise: yup.string().max(0), }), secure: yup.boolean().required(), password: yup.string().when('secure', { is: true, then: yup.string().min(6, 'password must be atleast 6 characters long and contains only alphabets and numbers').matches(/[a-zA-Z0-9]{6,}/g, 'password must be atleast 6 characters long and contains only alphabets and numbers').required(), otherwise: yup.string().max(0), }), login: yup.boolean().required(), userid: yup.string().when('login', { is: true, then: yup.string().min(4, 'userid must be atleast 4 characters long').matches(/[0-9]{4,}/g, 'userid must be atleast 4 characters long and contains only numbers').required(), otherwise: yup.string().max(0), }), track: yup.boolean().required() });

        schema
            .validate({ ...req.body }, { strict: true })
            .then(function (valid) {
                // console.log(valid)
                next()
            }).catch(function (err) {

                res.status(406).json({
                    validation: false,
                    type: err.name,
                    error: err.errors
                })
            })




    }

    static userredirectdata = (req: Request, res: Response, next: NextFunction): void => {
        next()
    }
}