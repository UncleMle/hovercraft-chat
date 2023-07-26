import express, { Request, Response } from 'express';
import api from '../api/hover.api';
import { Repository } from 'typeorm';
import { Sessions } from '../db/entities/hover.sessions';
import { AppDataSource } from '../db/data-source';

export default express.Router().get('/', async(req: Request, res: Response) => {
    const headerCheck: Boolean = await api.checkHeaderProps(req.headers, ['x-auth-token', 'x-auth-roomid', 'x-auth-modifier', 'x-auth-modifier-value']);
    const tokenAuth: boolean = headerCheck? await api.authToken(req.header('x-auth-token')):(null);

    console.log(req.headers);
    console.log(headerCheck, tokenAuth);
    if(!headerCheck || !tokenAuth) return api.errHandle('param', res);

    const sessionRepo: Repository<Sessions> = AppDataSource.getRepository(Sessions);

    const findSession: Sessions = await sessionRepo.findOne({ where: { token: req.header('x-auth-token'), sessionId: req.header('x-auth-roomid') } });

    if(findSession) {

        const token: string = req.header('x-auth-token');
        const modifier: string = req.header('x-auth-modifier');
        const sessionId: string = req.header('x-auth-roomid');
        const modValue: string | boolean = req.header('x-auth-modifier-value');

        switch(modifier) {
            case 'private':
            {
                sessionRepo.update({ token: req.header('x-auth-token') }, { private: req.header('x-auth-modifier-value') == 'true'? true: false });
                res.send({ status: true, info: `Session with ID ${sessionId} was modifed to be private with value ${req.header('x-auth-modifier')}` });

                break;
            }
            default: break;
        }

    } else return res.status(404).send({ status: false, error: 'Invalid session or invalid authentication credentials' });


})
