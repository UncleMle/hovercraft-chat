import express, { Express } from 'express';
import http from 'http';
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


app.listen(port, (): void => {
    api.Log(`App is now listening on port ${port}`);
});

api.Log(`All ${routes.length} routes were loaded.`);