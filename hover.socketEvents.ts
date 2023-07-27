import { Server, Socket } from 'socket.io';
import api from './api/hover.api';
import { createServer } from 'http';
import app from './hover.core';

const httpServer = createServer(app);
export const io : Server = new Server(httpServer, { cors: { origin: 'http://localhost:8080' } });

import sendMessages from './socketEvents/se.send-messages';
import joinRoom from './socketEvents/se.join-room';
import getUsers from './socketEvents/se.get-users';
import getMessages from './socketEvents/se.get-messages';


io.on('connection', (socket: Socket): void => {
    api.Log(`Socket ID ${socket.id} has connected`);

    let events: object[] = [
        { name: 'join-room', func: joinRoom},
        { name: 'send-message', func: sendMessages },
        { name: 'get-users', func: getUsers  },
        { name: 'get-messages', func: getMessages }
    ];

    try {
        events.forEach((event: any) => {
            socket.on(event.name, (data: any) => {
                event.func(data, socket);
            })
        });
    } catch(e) { console.log(e) };

});

httpServer.listen(3000);

export default io;