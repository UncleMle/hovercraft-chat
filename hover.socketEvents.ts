import { Server, Socket } from 'socket.io';
import { AppDataSource } from './db/data-source';
import { webTokens } from './db/entities/hover.webTokens';
import api from './api/hover.api';
import { createServer } from 'http';
import app from './hover.core';
import { SendData } from './shared/hover.types';

const httpServer = createServer(app);
const io : Server = new Server(httpServer, { cors: { origin: 'http://localhost:8080' } });

io.on('connection', (socket: Socket): void => {
    api.Log('New socket has been created with id of '+socket.id);

    socket.on('send-message', (data: SendData): void => {
        api.Log(JSON.stringify(data));
    })

    socket.on('join-room', (roomId: string): void => {
        if(roomId) {
            api.Log(`Room with ID ${roomId} was joined`);
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
