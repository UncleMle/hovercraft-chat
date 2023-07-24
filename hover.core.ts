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

const app : Express = express();
const port : number = 8081;

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

dc?apiMethods.Log('Discord intergration now running'):"";
socketEvents?apiMethods.Log('Socket events loaded'):"";

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

