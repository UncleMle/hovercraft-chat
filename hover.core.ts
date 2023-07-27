import express, { Express } from 'express';
import { color, log, red, green, cyan, cyanBright, gray } from 'console-log-colors';
import http from 'http';
import api from './api/hover.api';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { routes } from './hover.routes';
import 'reflect-metadata';

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import dc from './discord/hover.discord';
import { AppDataSource } from './db/data-source';
import { webTokens } from './db/entities/hover.webTokens';
import { Repository } from 'typeorm';
import { Sessions } from './db/entities/hover.sessions';
import { openSockets } from './db/entities/hover.openSockets';

const app : Express = express();
const port : number = 8081;

const httpServer = createServer(app);
export const io : Server = new Server(httpServer, { cors: { origin: 'http://localhost:8080' } });

import sendMessages from './socketEvents/se.send-messages';
import joinRoom from './socketEvents/se.join-room';
import getUsers from './socketEvents/se.get-users';
import getMessages from './socketEvents/se.get-messages';

AppDataSource.initialize().then(async() => {

    api.Log(`Data Source has been initialized`);

    const tokenRepo: Repository<webTokens> = AppDataSource.getRepository(webTokens);
    const sessions: Repository<Sessions> = AppDataSource.getRepository(Sessions);
    const openSockes: Repository<openSockets> = AppDataSource.getRepository(openSockets);

    tokenRepo.clear().then(() => api.Log('Flushed old web tokens'));
    sessions.clear().then(() => api.Log(red('Flushed old sessions')));
    openSockes.clear().then(() => api.Log(red('Flushed old open sockets')));

    app.use(cors());
    app.use(morgan('combined'));
    app.use(bodyParser.json());


    app.listen(port, (): void => {
        api.Log(`App is now listening on port`+red(` ${port}`));
    });

    routes.forEach((route : any) => {
        app.use(route.path, route.location);
    })

    api.Log(`All `+cyan(`${routes.length}`)+` routes were loaded.`);

    dc?api.Log('Discord intergration now running'):(null);


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
    api.Log('Socket events loaded');

}).catch(err => {api.Log(err)})

export default app;