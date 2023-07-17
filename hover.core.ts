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

const api = new apiMethods();

const app : Express = express();
const port : number = 8081;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.listen(port, (): void => {
    api.Log(`App is now listening on port ${port}`);
});

api.Log(`All ${routes.length} routes were loaded.`);

dc?api.Log('Discord intergration now running'):"";


setTimeout(() => {
    async function main() {

        const tokenRepo = AppDataSource.getRepository(webTokens);

        const tok = await tokenRepo.find({ where: { token: 'Helo asd asd ', timeCreated: 1689525965 } });

        console.log(tok.length);

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

