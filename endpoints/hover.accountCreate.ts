import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';
import { IncomingHttpHeaders } from 'http';

const api = new apiMethods();
const router = express.Router();

export default router.get('/', async(req: Request, res: Response) => {
    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck = await checkAccProps(headers);
    api.Log(headerCheck);
});

async function checkAccProps(header: IncomingHttpHeaders): Promise<Boolean> {
    let except: Boolean = false;
    let exceptProps: string[] = ['x-auth-token', 'x-auth-user', 'x-auth-pass'];
    let head = Object.entries(header);

    let foundItems: number[] = [];
    for(const [key, val] of head) {
        if(exceptProps.indexOf(key) != -1) { foundItems.push(1) };
    }

    return foundItems.length > 2 ? true : false;
}