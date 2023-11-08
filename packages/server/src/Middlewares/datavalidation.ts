//@ts-ignore
import * as yup from 'yup';

import { Request, Response, NextFunction } from "express";

export default class validation {

    static shorturlrequest = (req: Request, res: Response, next: NextFunction): void => {

        let schema = yup.object().shape({ destination: yup.string().min(13, 'URL must be atleast 13 characters long').url().required(), custom: yup.boolean().required(), keyword: yup.string().when('custom', { is: true, then: yup.string().min(4, 'keyword must be atleast 4 characters long').required(), otherwise: yup.string().max(0), }), secure: yup.boolean().required(), password: yup.string().when('secure', { is: true, then: yup.string().min(6, 'password must be atleast 6 characters long and contains only alphabets and numbers').matches(/[a-zA-Z0-9]{6,}/g, 'password must be atleast 6 characters long and contains only alphabets and numbers').required(), otherwise: yup.string().max(0), }), login: yup.boolean().required(), userid: yup.string().when('login', { is: true, then: yup.string().min(4, 'userid must be atleast 4 characters long').matches(/[0-9]{4,}/g, 'userid must be atleast 4 characters long and contains only numbers').required(), otherwise: yup.string().max(0), }), track: yup.boolean().required() });

        schema
            .validate({ ...req.body }, { strict: true })
            .then(function (valid: any) {
                // console.log(valid)
                next()
            }).catch(function (err: any) {

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


    static userregistration = (req: Request, res: Response, next: NextFunction): void => {

        let schema = yup.object().shape({
            fullname: yup.string().min(5, 'name must be atleast 5 characters long').max(100, 'name must be within 200 characters').matches(/[a-z\s]{5,100}/g, 'Only alphabets are allowed as name').lowercase().required('Required'),
            email: yup.string().email().matches(/(^[a-zA-Z0-9._-]{2,100})(@[a-zA-Z0-9\-]{2,63})(.[a-zA-Z.-]{2,63})/g, 'valid emails are allowed as email').lowercase().required('Required'),
            mobile: yup.string().min(10, 'mobile number must be 10 digit long').max(10, 'mobile number must be atleast 10 digit long').matches(/^(6|7|8|9)[0-9]{9}/g, 'Only numbers are allowed as mobile').nullable(),
            password: yup.string().matches(/^[a-zA-Z0-9#%\+_\-@!&$*]+$/g, 'Password must be alphanumeric and should conatins only a-z A-Z 0-9 ! @ # $ % & * + - _').min(5, 'password must be atleast 5 characters long').max(20, 'password must be within 20 characters').required('Required'),
            confirm_password: yup.string().oneOf([yup.ref('password'), null], "Passwords don't match!").required('Required')
        });

        schema
            .validate({ ...req.body }, { strict: true })
            .then(function (valid: any) {
                // console.log(valid,'.........')
                next()
            }).catch(function (err: any) {

                res.status(406).json({
                    registration: false,
                    type: err.name,
                    error: err.errors
                })
            })
    }

    static usersignin = (req: Request, res: Response, next: NextFunction): void => {
        let schema = yup.object().shape({

            email: yup.string().email().matches(/(^[a-zA-Z0-9._-]{2,100})(@[a-zA-Z0-9\-]{2,63})(.[a-zA-Z.-]{2,63})/g, 'valid emails are allowed as email').lowercase().required('Required'),

            password: yup.string().matches(/^[a-zA-Z0-9#%\+_\-@!&$*]+$/g, 'Password must be alphanumeric and should conatins only a-z A-Z 0-9 ! @ # $ % & * + - _').min(5, 'password must be atleast 5 characters long').max(20, 'password must be within 20 characters').required('Required'),

        });

        schema
            .validate({ ...req.body }, { strict: true })
            .then(function (valid: any) {
                // console.log(valid,'.........')
                next()
            }).catch(function (err: any) {

                res.status(406).json({
                    registration: false,
                    type: err.name,
                    error: err.errors
                })
            })
    }
}