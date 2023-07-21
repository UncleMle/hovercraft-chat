import { Socket } from 'socket.io';
import { AppDataSource } from './db/data-source';
import { webTokens } from './db/entities/hover.webTokens';
import apiMethods from './api/hover.api';

import io from './hover.core';

const api = new apiMethods();

io.on('connection', (socket: Socket) => {
    api.Log('New socket has been created with id of '+socket.id);

    socket.on('send-message', (message: string, roomId: string): void => {
        console.log(`Socket Creds from `+ message, roomId);
        if(!roomId || !message) return;
        socket.to(roomId).emit('recieve-message', message);
    })

    socket.on('join-room', (roomId: string) => {
        if(roomId) {
            const tokenRepo = AppDataSource.getRepository(webTokens);

            tokenRepo.find({ where: { sessionId: roomId } }).then(res => {
                if(res.length > 0) { socket.join(roomId) }
            })
        }
    })
});

export default io;