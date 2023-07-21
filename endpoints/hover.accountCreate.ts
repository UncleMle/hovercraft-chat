import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';
import { IncomingHttpHeaders } from 'http';

const api = new apiMethods();
const router = express.Router();

export default router.get('/', async(req: Request, res: Response) => {
    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await api.checkAccProps(headers, ['x-auth-token', 'x-auth-user', 'x-auth-pass']);
    if(headerCheck) {
        let headerObj: [string, string | string[]][] = Object.entries(headers);

        let tok: string | string[];

        headerObj.find((obj, idx) => obj[idx] === 'x-auth-token' ? tok=obj[1] : "");

        tok? api.Log('Token: '+tok) : "";

    } else return api.errHandle('param', res);
});
