import express, { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import api from '../api/hover.api';
import { AppDataSource } from '../db/data-source';
import { Sessions } from '../db/entities/hover.sessions';
import { Repository } from 'typeorm';
import { webTokens } from '../db/entities/hover.webTokens';
import sendApi from '../discord/hover.discord';
import conf from '../discord/discord.conf';

const router = express.Router();

export default router.get('/', async(req: Request, res: Response): Promise<void | boolean | Response> => {
    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await api.checkHeaderProps(headers, ['x-auth-token', 'x-auth-roomid']);
    const tokenAuth: boolean = headerCheck? await api.authToken(req.header('x-auth-token')): (null);

    console.log(`${headerCheck} | ${req.header('x-auth-token')} | ${req.header('x-auth-roomId')}`);

    if(headerCheck && tokenAuth) {
        const sessionRepo: Repository<Sessions> = AppDataSource.getRepository(Sessions);
        const tokenRepo: Repository<webTokens> = AppDataSource.getRepository(webTokens);

        const findSession: Sessions = await sessionRepo.findOne({ where: { sessionId: req.header('x-auth-roomId') } });
        if(!findSession) return res.status(404).send({ status: false, error: 'Session was not found.' });

        const findToken: webTokens = await tokenRepo.findOne({ where: {token: req.header('x-auth-token')} });
        if(!findToken) return res.status(404).send({ status: false, error: 'Level two token access validation error.' }), sendApi.channelSend(conf.managementChannel, `A level two token access validation error occured within process ID: ${process.getuid} | Token: ${req.header('x-auth-token')}`)

        tokenRepo.update({ token: findToken.token }, {
            sessionId: req.header('x-auth-roomid')
        }).catch(err => {api.Log(err)});

        res.status(200).send({
            status: true,
            info: `Session with ID ${req.header('x-auth-roomId')} was found.`
        });

    } else return api.errHandle('param', res);

})