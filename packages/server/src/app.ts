"use strict";
import express, { Express, Request, Response } from 'express'

const app = express();
const port = 5000;

app.get('/*', (req: Request, res: Response): Response => {
    return res.json({ "status": 200 });
})


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})