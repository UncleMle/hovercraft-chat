import express, { Request, Response, Router } from 'express';
import apiMethods from '../api/hover.api';
import discordConf from '../discord/discord.conf';
import axios, { ResponseType } from 'axios';
import { IncomingHttpHeaders } from 'http';
import { Accounts } from '../db/entities/hover.accounts';
import { AppDataSource } from '../db/data-source';
import { Repository } from 'typeorm';

export default express.Router().get('/', async(req: Request, res: Response): Promise<void | boolean> => {

    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await apiMethods.checkHeaderProps(headers, ['x-auth-token', 'x-auth-user', 'x-auth-pass']);
    const tokenAuth: string | boolean = headerCheck? await apiMethods.authToken(req.header('x-auth-token')): (null)

    if(!headerCheck || !tokenAuth || !req.query.code) return apiMethods.errHandle('param', res);

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

        const accountRepo: Repository<Accounts> = AppDataSource.getRepository(Accounts);

        const foundAcc: Accounts = await accountRepo.findOne({ where: { username: req.header('x-auth-user') } });

        if(!foundAcc) {
            res.status(404).send({
                status: false,
                error: 'Invalid account'
            });
            return;
        };

        let start: number = apiMethods.getUnix();

        accountRepo.update({ username: req.header('x-auth-user') }, {
            discordData: userResponse.data
        }).then(() => {
            let end: number = apiMethods.getUnix() - start;
            apiMethods.Log(`Query exec in ${new Date(end*1000)}`);
        })


        res.status(200).send({
            status: true,
            info: 'Discord data saved'
        });

    } catch(e: any) { (apiMethods.Log('[AXIOS] '+(e as Error).message), apiMethods.errHandle('auth', res)) }

})