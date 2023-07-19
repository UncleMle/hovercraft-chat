import express, { Express } from 'express';
import http from 'http';
import apiMethods from './api/hover.api';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './hover.routes';
import 'reflect-metadata';

import dc from './discord/hover.discord';
import { AppDataSource } from './db/data-source';
import { webTokens } from './db/entities/hover.webTokens';
import { createServer } from 'http';
import { Server } from 'socket.io';

const api = new apiMethods();

const app : Express = express();
const port : number = 8081;
const httpServer = createServer(app);
const io : Server = new Server(httpServer, { cors: { origin: 'http://localhost:8080' } });

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('New socket has been created with id of '+socket.id);

    socket.on('send-message', (message: string) => {
        socket.broadcast.emit('recieve-message', message);
        console.log(message);
    })
})

httpServer.listen(3000);

/*
app.listen(port, (): void => {
    api.Log(`App is now listening on port ${port}`);
});
*/

api.Log(`All ${routes.length} routes were loaded.`);

dc?api.Log('Discord intergration now running'):"";
































setTimeout(() => {
    async function main() {

        /*
        const tokenRepo = AppDataSource.getRepository(webTokens);

        const tok = await tokenRepo.findOne({ where: { token: 'Helo asd asd ', timeCreated: 1689525965 } });

        console.log(tok ? 0 : 1);
        */

        /*
        await tokenRepo.update(2, {
            token: 'Asd aisdk asdk asopd kasd ',
            timeCreated: api.getUnix()
        });
        */

        /**const allRecords = await tokenRepo.find();

        console.log(allRecords); */

    }

    main();
}, 2000);

