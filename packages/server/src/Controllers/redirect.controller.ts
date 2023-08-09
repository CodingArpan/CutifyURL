import { Request, Response } from "express";
import shortUrl, { Shorturl_temp } from "../Models/miniURL.model";
import userData, { userdata_temp } from "../Models/userdata.model";
import bcrypt from "bcryptjs";

class redirection {

    static handelRedirect = async (req: Request, res: Response): Promise<Response> => {
        try {


            const redirectid: string = req.body.pathID;

            const data: { destination: string; secure: boolean; _id: string; } | null = await shortUrl.findOne({ keyword: redirectid }).select<Shorturl_temp>('destination secure _id');
            console.log(data)

            if (data) {

                let url = data.secure ? 'blank' : data.destination;

                interface datapass {
                    // baseurl?: string;
                    security: boolean;
                    destination: string;
                    pathid: string;
                    refid: string;
                }

                let datapass: datapass = {

                    security: data.secure,
                    destination: url,
                    pathid: redirectid,
                    refid: data._id.toString(),
                }
                return res.status(200).json({ ...datapass })
                // return res.render('Collectanalytics', { ...datapass });
            } else {
                return res.status(200).json({ refid: '0' })

            }

        } catch (err) {
            // return res.render('LinkExpired');
            console.log(err)
            return res.status(200).json({ refid: '0', message: 'Internal Server Error' });


        }

    }

    static redirectdatacollection = async (req: Request, res: Response): Promise<Response | void> => {
        // console.log(req.body)
        try {


            let { pathid, refid }: userdata_temp = req.body;
            console.log(pathid, refid)

            let available: ({ _id: string, destination: string })[] = await shortUrl.find({ keyword: pathid, _id: refid }).select('destination');

            // console.log(available)

            if (available.length) {
                let saved = await userData.create<userdata_temp>({ ...req.body });
                // console.log(saved)
                return res.status(200).json({
                    request: 'successfull',
                    status: 200
                })
            } else {
                return res.status(200).json({
                    request: 'failed',
                    message: 'Not Found'
                })
            }


        } catch (error) {
            return res.status(500).json({
                request: 'failed',
                message: 'Internal Server Error'
            })
        }
    }

    static redirectpasswordvalidation = async (req: Request, res: Response): Promise<Response> => {
        try {

            let { securecode,
                pathid,
                refid }: {
                    securecode: string;
                    pathid: string;
                    refid: string;
                } = req.body;

            const data: (Shorturl_temp & {
                _id: string;
            }) | null = await shortUrl.findOne({ keyword: pathid, _id: refid }).select<Shorturl_temp>('password destination');
            console.log(data);

            if (data) {
                const validation: boolean = bcrypt.compareSync(securecode, data.password);
                console.log(validation)
                if (validation) {
                    return res.status(200).json({
                        authentication: 'successfull',
                        destination: data.destination
                    })
                } else {
                    return res.status(401).json({
                        authentication: 'failed',

                    })
                }

            } else {
                return res.status(401).json({
                    authentication: 'failed',
                    message: 'This url is invalid'
                })

            }


        } catch (error) {
            return res.status(500).json({
                authentication: 'failed',
                message: 'Internal Server Error'
            })
        }


    }

}
export default redirection;

