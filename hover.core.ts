import express, { Express } from 'express';
import apiMethods from './api/hover.api';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './hover.routes';
import 'reflect-metadata';

import { AppDataSource } from "./db/data-source";
import { webTokens } from './db/entities/hover.webTokens';

const api = new apiMethods();

const app : Express = express();
const port : number = 8081;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());


AppDataSource.initialize().then(async () => {

    /* TypeORM init
    console.log("Inserting a new user into the database...")
    const webToken = new webTokens();
    webToken.token = 'Helo';
    webToken.timeCreated = api.getUnix();
    await AppDataSource.manager.save(webToken);
    console.log("Saved a new user with id: " + webToken.id);

    console.log("Loading users from the database...");
    const tokens = await AppDataSource.manager.find(webTokens);
    console.log("Loaded tokens: ", tokens);
    */

}).catch(error => console.log(error))


app.listen(port, (): void => {
    api.Log(`App is now listening on port ${port}`);
});

api.Log(`All ${routes.length} routes were loaded.`);