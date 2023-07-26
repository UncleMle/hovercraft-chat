import express, { Response, Request } from 'express';
import api from '../api/hover.api';
import { Repository } from 'typeorm';
import { Sessions } from '../db/entities/hover.sessions';
import { AppDataSource } from '../db/data-source';
import { openSockets } from '../db/entities/hover.openSockets';

export default express.Router().get('/', async(req: Request, res: Response): Promise<void | boolean | Response> => {
    const headerCheck: Boolean = await api.checkHeaderProps(req.headers, ['x-auth-token', 'x-auth-roomid']);
    const tokenCheck: boolean = headerCheck? await api.authToken(req.header('x-auth-token')):(null);

    if(!headerCheck || !tokenCheck) return api.errHandle('auth', res);

    const sessionRepo: Repository<Sessions> =  AppDataSource.getRepository(Sessions);
    const openSocketRepo: Repository<openSockets> = AppDataSource.getRepository(openSockets);

    const findSession: Sessions = await sessionRepo.findOne({ where: { sessionId: req.header('x-auth-roomid') } });
    if(!findSession) return res.send({ status: false, error: 'Session not found' });

    const findOwner: openSockets = await openSocketRepo.findOne({ where: { token: findSession.token} });

    res.status(200).send({ status: true, private: findSession.private, ownerSQLID: findOwner? findOwner.id: -1 });

})