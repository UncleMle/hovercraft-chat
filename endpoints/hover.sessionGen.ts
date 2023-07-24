import express, { Request, Response, Router } from 'express';
import api  from '../api/hover.api';
import { webTokens } from '../db/entities/hover.webTokens';
import { AppDataSource } from '../db/data-source';
import { IncomingHttpHeaders } from 'http';
import { Repository } from 'typeorm';
import { Sessions } from '../db/entities/hover.sessions';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

const router: Router = express.Router();

const limiter: RateLimitRequestHandler = rateLimit({
	windowMs: 5000 * 60 * 1000,
	max: 200,
    message: 'This IP as been flagged as creating too many requests (over 5000). Please wait 60 minutes',
	standardHeaders: true,
	legacyHeaders: false
});

export default router.get('/', limiter, async(req : Request, res : Response): Promise<void | Response | boolean> => {
    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await api.checkHeaderProps(headers, ['x-auth-token']);
    const tokenCheck: Boolean = await api.authToken(req.header('x-auth-token'));

    if(headerCheck && tokenCheck) {

        const sessionRepo: Repository<Sessions> = AppDataSource.getRepository(Sessions);
        const tokenRepo: Repository<webTokens> = AppDataSource.getRepository(webTokens);

        const tokenData: webTokens  = await tokenRepo.findOne({ where: {token: req.header('x-auth-token')} });
        if(!tokenData) return res.status(404).send({ status: false, error: 'Invalid Token' });

        const newSession: Sessions = new Sessions();
        newSession.token = req.header('x-auth-token');
        newSession.sessionId = 'Awaiting definition';
        newSession.ownerID = tokenData.accountId;
        newSession.ownerUUID = tokenData.accountUUID;
        newSession.timeCreated = api.getUnix();
        newSession.createdAt = api.getUnix();

        sessionRepo.save(newSession).then(savedRepo => {

            const sessId = savedRepo.uuid.split('-')[1];

            tokenRepo.update({ token: req.header('x-auth-token') }, {
                sessionId: sessId
            })

            sessionRepo.update({ id: savedRepo.id }, {
                sessionId: sessId
            })
            .then(() => {

                res.status(200).send({
                    status: true,
                    data: [
                        { sessionId: sessId }
                    ]
                });

            })

        })
        .catch(err => { api.Log(err) });

    } else return api.errHandle('param', res);
});
