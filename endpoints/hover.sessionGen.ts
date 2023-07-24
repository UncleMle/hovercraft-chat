import express, { Request, Response, Router } from 'express';
import apiMethods from '../api/hover.api';
import { webTokens } from '../db/entities/hover.webTokens';
import { AppDataSource } from '../db/data-source';

const router: Router = express.Router();

export default router.get('/', async(req : Request, res : Response): Promise<void> => {
    const token: string = req.header('x-auth-token');
    if(token) {
        const auth : Boolean = await apiMethods.authToken(token);
        if(auth) {
            const tokenRepo = AppDataSource.getRepository(webTokens);
            let newToken : webTokens = new webTokens();
            newToken.token = token;
            newToken.sessionId = `Not Defined`;
            newToken.timeCreated = apiMethods.getUnix();

            const tokenIns: webTokens = await tokenRepo.save(newToken);

            tokenRepo.find({ where: { id: tokenIns.id } }).then(() => {
                tokenRepo.update(tokenIns.id, { sessionId: `${apiMethods.charGen(4)}${tokenIns.id}` });
            })

            res.status(200).send({
                status: true,
                session: `${apiMethods.charGen(4)}${tokenIns.id}`
            })

        } else return apiMethods.errHandle('auth', res);

    } else return apiMethods.errHandle('auth', res);
});
