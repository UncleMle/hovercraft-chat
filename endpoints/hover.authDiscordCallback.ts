import express, { Request, Response, Router } from 'express';
import apiMethods from '../api/hover.api';
import discordConf from '../discord/discord.conf';
import axios, { ResponseType } from 'axios';
import { IncomingHttpHeaders } from 'http';
import { Accounts } from '../db/entities/hover.accounts';
import { AppDataSource } from '../db/data-source';

const api: apiMethods = new apiMethods();
const router: Router = express.Router();

export default router.get('/', async(req: Request, res: Response): Promise<void | boolean> => {

    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await api.checkHeaderProps(headers, ['x-auth-token', 'x-auth-user', 'x-auth-pass']);
    const tokenAuth: string | boolean = headerCheck? await api.authToken(req.header('x-auth-token')): (null);

    if(!headerCheck || !tokenAuth || !req.query.code) return api.errHandle('param', res);

    try {

        const code: any = req.query.code;

        const params: URLSearchParams = new URLSearchParams({
            client_id: discordConf.clientId,
            client_secret: discordConf.clientSecret,
            grant_type: 'authorization_code',
            code,
            redirect_uri: discordConf.redirectUrl
        });

        const headers: IncomingHttpHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/x-www-form-urlencoded'
        };

        const response: any = await axios.post('https://discord.com/api/oauth2/token', params, { headers });

        const userResponse: any = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${response.data.access_token}`
            }
        });

        const accountRepo = AppDataSource.getRepository(Accounts);

        const foundAcc = await accountRepo.findOne({ where: { username: req.header('x-auth-user') } });

        if(!foundAcc) {
            res.status(404).send({
                status: false,
                error: 'Invalid account'
            });
            return;
        };

        accountRepo.update({ username: req.header('x-auth-user') }, {
            discordData: userResponse.data
        });


        res.status(200).send({
            status: true,
            info: 'Discord data saved'
        });

    } catch(e: any) { (api.Log('[AXIOS] '+(e as Error).message), api.errHandle('auth', res)) }

})