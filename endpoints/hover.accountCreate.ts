import express, { Request, Response, Router, query } from 'express';
import apiMethods from '../api/hover.api';
import { IncomingHttpHeaders } from 'http';
import bcrypt from 'bcrypt';
import { Accounts } from '../db/entities/hover.accounts';
import { AppDataSource } from '../db/data-source';
import { _SHARED } from '../shared/hover.constants';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Repository } from 'typeorm';
import { red } from 'console-log-colors';

const router: Router = express.Router();

const limiter: RateLimitRequestHandler = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 200,
    message: 'Too many accounts created from this IP, please try again later',
	standardHeaders: true,
	legacyHeaders: false
});

export default router.get('/', limiter, async(req: Request, res: Response): Promise<void | Response> => {
    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await apiMethods.checkHeaderProps(headers, ['x-auth-token', 'x-auth-user', 'x-auth-pass', 'x-auth-email']);
    const tokenAuth: string | boolean = headerCheck? await apiMethods.authToken(req.header('x-auth-token')): (null);

    if(headerCheck && tokenAuth) {

        try {
            const accRepo: Repository<Accounts> = AppDataSource.getRepository(Accounts);

<<<<<<< HEAD
            if(!await apiMethods.valEmail(req.header("x-auth-email"))) return res.status(301).send({
                status: false,
                error: "Invalid email address"
            });
=======
            if(!await api.valEmail(req.header('x-auth-email'))) {
                res.send({
                    status: false,
                    error: 'Ensure you have entered a valid email address'
                });
                return;
            }
>>>>>>> 9232663a63be0d0096585a1ca33200bbbe95ef54

            const foundAccount: Accounts[] = await accRepo.find({
                where: [
                    { username: req.header('x-auth-user') },
                    { email: req.header('x-auth-email') }
                ]
            })

            if(foundAccount.length > 0) return res.send({
                status: false,
                error: 'Invalid credentials, please use different credentials.'
            });


            if (!await apiMethods.containsNumbers(req.header('x-auth-pass')) || !await apiMethods.containsUppercase(req.header('x-auth-pass')) || req.header('x-auth-pass').length < 5) {
                res.send({
                    status: false,
                    error: 'Password must contain atleast one number, one uppercase character, one special symbol and have a character length greater than 5.'
                })
                return;
            }

            let hashPass: string | Boolean = await bcrypt.hash(req.header('x-auth-pass'), _SHARED.saltRounds);

            const account: Accounts = new Accounts();
            account.username = req.header('x-auth-user');
            account.email = req.header('x-auth-email');
            account.password = hashPass;
            account.banned = false;
<<<<<<< HEAD
            account.ip = '127.0.0.1';
            account.createdTime = apiMethods.getUnix();
            account.lastActive = apiMethods.getUnix();
=======
            account.ip = req.socket.remoteAddress;
            account.createdTime = api.getUnix();
            account.lastActive = api.getUnix();
>>>>>>> 9232663a63be0d0096585a1ca33200bbbe95ef54
            account.discordData = null;
            account.totalChatSessions = 0;
            account.adminPunishments = [];
            account.notifications = [];
            account.adminLevel = 0;

            let accObj: Accounts;
            let startTime: number = new Date().valueOf();

            accRepo.save(account).then(acc => {
<<<<<<< HEAD
                apiMethods.Log(`A new account was created with [SQLID: ${acc.UUID}, username: ${acc.username}]`)
=======
                api.Log(`A new account was created with `+red(`[SQLID: ${acc.UUID}, username: ${acc.username}]`));
                accObj = acc;
            }).then(() => {
                let endTime: number = new Date().valueOf();
                let queryTime = endTime - startTime;

>>>>>>> 9232663a63be0d0096585a1ca33200bbbe95ef54
                res.status(200).send({
                    status: true,
                    data: `A new account was created with [SQLID: ${accObj.UUID}, username: ${accObj.username}]`,
                    queryTime: queryTime+"ms"
                });
            });

<<<<<<< HEAD
        } catch(e: any) { apiMethods.Log((e as Error).message) }
=======

        } catch(e: any) { api.Log((e as Error).message) }
>>>>>>> 9232663a63be0d0096585a1ca33200bbbe95ef54

    } else return apiMethods.errHandle('param', res);
});


