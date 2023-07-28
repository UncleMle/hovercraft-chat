import express, { Request, Response } from 'express';
import api from '../api/hover.api';
import { io } from "../hover.core";
import { Repository } from 'typeorm';
import { openSockets } from '../db/entities/hover.openSockets';
import { AppDataSource } from '../db/data-source';

export default express.Router().get('/', async(req: Request, res: Response): Promise<void | boolean | Response> => {
    const headerCheck: Boolean = await api.checkHeaderProps(req.headers, ['x-auth-token', 'x-auth-roomid']);
    const tokenAuth: boolean = headerCheck? await api.authToken(req.header('x-auth-token')): (null);

    if(!tokenAuth) return api.errHandle('auth', res);
    if(!headerCheck) return api.errHandle('param', res);

    const clients = io.sockets.adapter.rooms.get(req.header('x-auth-roomid'));
    const numClients = clients? clients.size :0;

    res.status(200).send({
        status: true,
        data: numClients,
    })

})
