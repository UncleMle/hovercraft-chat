import express, { Request, Response, Router } from 'express';
import apiMethods from '../api/hover.api';
import { IncomingHttpHeaders } from 'http';
import bcrypt from 'bcrypt';
import { Accounts } from '../db/entities/hover.accounts';
import { AppDataSource } from '../db/data-source';
import { _SHARED } from '../shared/hover.constants';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

const api : apiMethods = new apiMethods();
const router: Router = express.Router();

const limiter: RateLimitRequestHandler = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 30000,
    message: 'Too many accounts created from this IP, please try again later',
	standardHeaders: true,
	legacyHeaders: false,
});

export default router.get('/', limiter, async(req: Request, res: Response) => {
    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await api.checkAccProps(headers, ['x-auth-token', 'x-auth-user', 'x-auth-pass']);
    const tokenAuth = headerCheck? await api.authToken(req.header('x-auth-token')): "";

    if(headerCheck && tokenAuth) {

        try {
            let hashPass: string | Boolean = await bcrypt.hash(req.header('x-auth-pass'), _SHARED.saltRounds);

            const accRepo = AppDataSource.getRepository(Accounts);

            const account : Accounts = new Accounts();
            account.username = req.header('x-auth-user');
            account.password = hashPass;
            account.banned = false;
            account.ip = '127.0.0.1';
            account.createdTime = api.getUnix();
            account.lastActive = api.getUnix();
            account.discordAuth = 'None';

            accRepo.save(account).then(acc => {
                api.Log(`A new account was created with [SQLID: ${acc.UUID}, username: ${acc.username}]`)
                res.status(200).send({
                    status: true,
                    data: `A new account was created with [SQLID: ${acc.UUID}, username: ${acc.username}]`
                });
            });

        } catch(e) { api.Log(e) }

    } else return api.errHandle('param', res);
});
