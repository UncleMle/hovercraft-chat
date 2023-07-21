import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';
import bcrypt from 'bcrypt';
import { accounts } from '../db/entities/hover.accounts';
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
    const accRepo = AppDataSource.getRepository(accounts);

    accRepo.findOne({ where: { username: username } }).then(async(findAcc) => {
        if(findAcc) {
            let accAuth: Boolean = await bcrypt.compare(password, findAcc[0].password);
            if(accAuth) {
                res.status(300).send({
                    sqlid: findAcc.id,
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