import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';
import bcrypt from 'bcrypt';
import { Accounts } from '../db/entities/hover.accounts';
import { AppDataSource } from '../db/data-source';

const router = express.Router();
const api = new apiMethods();

export default router.get('/', async(req: Request, res: Response) => {
    const token: string = req.header('x-auth-token');
    const username: string = req.header('x-auth-user');
    const password: string = req.header('x-auth-pass');
    if(token) {
        const tokenAuth: Boolean = await api.authToken(token);
        if(tokenAuth) {

            getAccount(username, password, res);

        } else return api.errHandle('auth', res);
    } else return api.errHandle('param', res);
})

async function getAccount(username: string, password: string, res: Response) {
    const accRepo = AppDataSource.getRepository(Accounts);

    accRepo.findOne({ where: { username: username } }).then(async(findAcc) => {
        if(findAcc) {
            let accAuth: Boolean = await bcrypt.compare(password, findAcc.password);
            console.log(accAuth);
            if(accAuth) {
                res.status(300).send({
                    sqlid: findAcc.UUID,
                    username: findAcc.username,
                    createdTime: findAcc.createdTime,
                    lastActive: findAcc.lastActive,
                    ip: findAcc.ip,
                    isBanned: findAcc.banned
                })
            } else {
                res.status(404).send({
                    status: true,
                    data: 'Invalid credentials'
                })
            }

        } else return res.status(404).send({
            status: true,
            data: 'Invalid credentials'
        })
    }).catch(err => api.Log(err));
}