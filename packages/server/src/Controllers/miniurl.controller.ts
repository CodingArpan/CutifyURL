import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import shortUrl, { Shorturl_temp } from "../Models/miniURL.model";
import utility from "../Middlewares/utility";

class miniurl {

    static createShortUrl = async (req: Request, res: Response): Promise<Response> => {
        try {

            let { destination, custom, keyword, secure, password, login, userid, track }: Shorturl_temp = req.body;

            // console.log(req.body)

            switch (custom) {
                case true:
                    if (keyword) {
                        const keystatus: boolean = await utility.checkavailablity(keyword); // if keyword found in database then return "true",else return "false".

                        if (keystatus) {
                            return res.status(200).json({
                                request: 'failed',
                                status: false,
                                message: 'keyword already in use, please try another'
                            })

                        } else {
                            break;
                        }

                    } else {
                        return res.status(200).json({
                            request: 'failed',
                            status: false,
                            message: 'keyword not found'
                        })
                    }


                case false:
                    const uniqueID: () => Promise<string | Error> = utility.createUrlId(secure);
                    const genID: string | Error = await uniqueID();
                    console.log(genID, '.......');
                    if (typeof (genID) === 'string') {
                        keyword = genID;
                        break;
                    }else{
                        return res.status(200).json({
                            request: 'failed',
                            status: false,
                            message: 'Minify of URL is failed'
                        })
                    }

            }

            switch (secure) {
                case true:
                    const salt: string = bcrypt.genSaltSync(10);
                    const hash: string = bcrypt.hashSync(password, salt);
                    password = hash
                    break

                case false:
                    password = '000000'
                    break;
                // default:
                //     break;
            }

            switch (login) {
                case true:
                    //lgin code goes here
                    break;
                case false:
                    userid = '0000';
                    break;
            }

            const newRequest = await shortUrl.create({
                destination,
                custom,
                keyword,
                secure,
                password, login, userid, track
            })

            return res.status(200).json({ request: 'successfull', destination: newRequest.destination, keyword: newRequest.keyword })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                request: 'failed',
                message: 'Internal Server Error'
            })
        }
    }

    static validatekeyword = async (req: Request, res: Response): Promise<Response> => {
        const keyword: string = req?.body?.keyword;
        // console.log(req?.body)
        const availability: boolean = await utility.checkavailablity(keyword);
        return !availability ? res.status(200).json({ useable: true }) : res.status(200).json({ useable: false });
    }

}

export default miniurl

