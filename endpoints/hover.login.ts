import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';
import bcrypt from 'bcrypt';
import { Accounts } from '../db/entities/hover.accounts';
import { AppDataSource } from '../db/data-source';
import { IncomingHttpHeaders } from 'http';
const router = express.Router();
const api = new apiMethods();

export default router.get('/', async(req: Request, res: Response): Promise<void> => {
    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await api.checkAccProps(headers, ['x-auth-token', 'x-auth-user', 'x-auth-pass']);
    const tokenAuth = headerCheck? await api.authToken(req.header('x-auth-token')): (null);

    if(headerCheck && tokenAuth) {
        const accRepo = AppDataSource.getRepository(Accounts);

        accRepo.findOne({ where: {username: req.header('x-auth-user')} }).then(async(_account) => {
            if(!_account) return res.status(404).send({
                status: true,
                error: 'Incorrect credentials'
            })

            const passCheck = await bcrypt.compare(req.header('x-auth-pass'), _account.password);
            passCheck? sendAccInfo(_account, res): (null);
        })


    } else return api.errHandle('param', res);

})

function sendAccInfo(_account: Accounts, res: Response):void {
    res.status(200).send({
        status: true,
        uuid: _account.UUID,
        sqlid: _account.id,
        banned: _account.banned,
        lastActive: _account.lastActive,
        createdAt: _account.createdTime
    });
}