/*
import express from 'express';
import apiMethods from '../api/hover.api';
import socketApp from '../hover.core';

const router = express.Router();
const api = new apiMethods();

export default router.get('/', async(req, res) => {
    const token = req.header('x-auth-token');
    const roomId = req.header('roomId');
    if(token && roomId) {
        const auth = await api.authToken(token);
        if(auth) {
            const sockets = await socketApp.in('test').fetchSockets();
            const socketIds = sockets.map(socket => socket.id);
            res.status(200).send({
                status: true,
                info: `${socketIds}`
            });
        } else return api.errHandle('auth', res);
    } else return api.errHandle('param', res);
})
*/

export default true;