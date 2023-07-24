import { Server, Socket } from 'socket.io';
import { AppDataSource } from './db/data-source';
import { webTokens } from './db/entities/hover.webTokens';
import apiMethods from './api/hover.api';
import { createServer } from 'http';
import app from './hover.core';

const httpServer = createServer(app);
const io : Server = new Server(httpServer, { cors: { origin: 'http://localhost:8080' } });

io.on('connection', (socket: Socket): void => {
    apiMethods.Log('New socket has been created with id of '+socket.id);

    socket.on('send-message', (message: string, roomId: string): void => {
        apiMethods.Log(`Socket Creds from `+ message+ roomId);
        if(!roomId || !message) return;
        socket.to(roomId).emit('recieve-message', message);
    })

    socket.on('join-room', (roomId: string): void => {
        if(roomId) {
            apiMethods.Log(`Room with ID ${roomId} was joined`);
            socket.join(roomId);
            /*
            const tokenRepo = AppDataSource.getRepository(webTokens);

            tokenRepo.find({ where: { sessionId: roomId } }).then(res => {
                if(res.length > 0) { socket.join(roomId) }
            })
            */
        }
    })

});

httpServer.listen(3000);

export default true;
