import express, { Express } from 'express';
import { color, log, red, green, cyan, cyanBright, gray } from 'console-log-colors';
import http from 'http';
import apiMethods from './api/hover.api';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './hover.routes';
import 'reflect-metadata';

import dc from './discord/hover.discord';
import socketEvents from './hover.socketEvents';
import { AppDataSource } from './db/data-source';
import { webTokens } from './db/entities/hover.webTokens';
import { Repository } from 'typeorm';
import { Sessions } from './db/entities/hover.sessions';
import { openSockets } from './db/entities/hover.openSockets';

const app : Express = express();
const port : number = 8081;

AppDataSource.initialize().then(async() => { // Not initilizating database in core file can cause data validation and meta data errors as endpoints attempt to access the database with certain repositories when it has not initilizied yet.

    apiMethods.Log(`Data Source has been initialized`);

    const tokenRepo: Repository<webTokens> = AppDataSource.getRepository(webTokens);
    const sessions: Repository<Sessions> = AppDataSource.getRepository(Sessions);
    const openSockes: Repository<openSockets> = AppDataSource.getRepository(openSockets);

    tokenRepo.clear().then(() => apiMethods.Log('Flushed old web tokens'));
    sessions.clear().then(() => apiMethods.Log('Flushed old sessions'));
    openSockes.clear().then(() => apiMethods.Log('Flushed old open sockets'));

    app.use(cors());
    app.use(morgan('combined'));
    app.use(bodyParser.json());


    app.listen(port, (): void => {
        apiMethods.Log(`App is now listening on port`+red(` ${port}`));
    });

    routes.forEach((route : any) => {
        app.use(route.path, route.location);
    })

    apiMethods.Log(`All `+cyan(`${routes.length}`)+` routes were loaded.`);

    dc?apiMethods.Log('Discord intergration now running'):(null);
    socketEvents?apiMethods.Log('Socket events loaded'):(null);

}).catch(err => {apiMethods.Log(err)})

export default app;





























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

