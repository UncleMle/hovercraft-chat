import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';
import { webTokens } from '../db/entities/hover.webTokens';
import { AppDataSource } from '../db/data-source';

const router = express.Router();
const api = new apiMethods();

export default router.get('/', async(req : Request, res : Response) => {
    const token = req.header('x-auth-token');
    if(token) {
        const auth : Boolean = await api.authToken(token);
        return sessionGeneration(auth, res);


    } else return api.errHandle('auth', res);
});

async function sessionGeneration(tokenStatus : Boolean, res: Response) {
    switch(tokenStatus) {
        case false:
        {
            return api.errHandle('auth', res);
        }
        case true:
        {
            AppDataSource.initialize().then(async () => {

            })
        }
        default: break;
    }
}
