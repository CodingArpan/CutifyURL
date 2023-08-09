import express, { Express, Request, Response } from 'express'
import path from "path";
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import routes from './Routes/index'
import db from './DB/DB'


const app = express();
const PORT: string | 4000 = process.env.PORT || 4000;
const DB_URL: string | any = process.env.DATABASE_URL;


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

const whitelistorigins: string | string[] = process.env.WHITELISTORIGINS || ['http://localhost:1000', 'http://localhost:1000']

// interface corsOptionsType {
//     origin: (string | boolean | RegExp | (RegExp | string)[] | ((origin: string, callback: () => void) => void));
//     methods: string[],
//     allowedHeaders: string[],
//     credentials: boolean,
//     preflightContinue: boolean,
// }

const corsOptions = {
    // origin:'*',
    origin: (origin: string, callback: (arg0: string | null, arg1: boolean | undefined) => void) => {
        console.log(origin,'--------------------------------')
        if (whitelistorigins.indexOf(origin) !== -1 && origin) {
            callback(null, true)
        } else {
            callback('You Dont Have Enough Permission to Access !!', false)

        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    preflightContinue: true,

}


app.listen(PORT, () => {
    console.log('App is running on port ' + `http://localhost:${PORT}`);
    db(DB_URL);
    //@ts-ignore
    routes<cors.CorsOptions>(app, corsOptions);
})


