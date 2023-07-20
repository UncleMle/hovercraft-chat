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
        if(auth) {
            const tokenRepo = AppDataSource.getRepository(webTokens);
            let newToken : webTokens = new webTokens();
            newToken.token = token;
            newToken.sessionId = `Not Defined`;
            newToken.timeCreated = api.getUnix();

            const tokenIns = await tokenRepo.save(newToken);

            tokenRepo.find({ where: { id: tokenIns.id } }).then(() => {
                tokenRepo.update(tokenIns.id, { sessionId: `${api.charGen(4)}${tokenIns.id}` });
            })

            res.status(200).send({
                status: true,
                session: `${api.charGen(4)}${tokenIns.id}`
            })

        } else return api.errHandle('auth', res);

    } else return api.errHandle('auth', res);
});
