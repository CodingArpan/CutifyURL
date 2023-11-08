import { Express, Request, Response } from "express";
import cors from "cors";
import buildMiniUrl from './miniurl.build'
import redirection from "../Controllers/redirect.controller";
import urlredirect from './url.redirect'
import authenticate from './user.auth'




const routes = <T extends cors.CorsOptions>(app: Express, corsOptions: T): void => {

    app.get('/checkup', (req: Request, res: Response): Response => {
        return res.send('App is Healthy')
    })

    app.get('/favicon.ico', (req: Request, res: Response): Response => {
        return res.send('App is Healthy')
    })

    // app.get('/:redirectid', redirection.handelRedirect)

    // app.use(cors(corsOptions)) // restrict access to other than client side
    app.use(cors()) // restrict access to other than client side

    app.use('/url', buildMiniUrl)

    app.use('/redirect', urlredirect)

    app.use('/auth', authenticate)


    app.all('*', (req: Request, res: Response): Response => {
        return res.status(200).json({ message: 'You Dont Have Enough Permission to Access :)' })
    })

}

export default routes;