import express, { Request, Response } from 'express';
import api from '../api/hover.api';
import { Repository } from 'typeorm';
import { Sessions } from '../db/entities/hover.sessions';
import { AppDataSource } from '../db/data-source';

export default  express.Router().get('/', async(req: Request, res: Response): Promise<void | Response | boolean> => {
    const headerCheck: Boolean = await api.checkHeaderProps(req.headers, ['x-auth-token', 'x-auth-roomid']);
    const tokenAuth: boolean = headerCheck? await api.authToken(req.header('x-auth-token')): (null);

    if(headerCheck && tokenAuth) {
        const sessionRepo: Repository<Sessions> = AppDataSource.getRepository(Sessions);
        const foundSession: Sessions = await sessionRepo.findOne({ where: { token: req.header('x-auth-token'), sessionId: req.header('x-auth-roomid') } });

        foundSession? ( res.send({ status: true, info: `Token is owner of specified session ${req.header('x-auth-roomid')}` }) ): ( res.send({status: false, info: `Token is not owner of specifed session ${req.header('x-auth-roomid')}`}) );

    } else return api.errHandle('param', res);
})