import express, { Application } from 'express'
import path from "path";
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import routes from './src/Routes/index'
import db from './src/DB/DB'
import serverless from 'serverless-http';


const app: Application = express();
const PORT: string | 4000 = process.env.PORT || 4000;
const DB_URL: string | any = process.env.DATABASE_URL;
const whitelistorigins: string | any = process.env.WHITELISTORIGINS;



app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');



const corsOptions = {
    origin: (origin: string, callback: (arg0: string | null, arg1: boolean | undefined) => void) => {
        console.log(origin, '--------------------------------')
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

db(DB_URL);
//@ts-ignore
routes<cors.CorsOptions>(app, corsOptions);

//only for local devlopment 
// comment this code when you deploy on serverless lambda server
app.listen(PORT, () => {
    console.log('App is running on port ' + `http://localhost:${PORT}`);
})

// Only for deplyment on serverless Lambda server
export const handler = serverless(app);

