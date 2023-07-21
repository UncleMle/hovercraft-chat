import "reflect-metadata";
import { DataSource } from "typeorm";
import apiMethods from '../api/hover.api';
import bcrypt from 'bcrypt';

import { webTokens } from "./entities/hover.webTokens";
import { logs } from "./entities/hover.logs";
import { Accounts } from "./entities/hover.accounts";

const api = new apiMethods();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "rootadmin13",
    database: "hovercraft.chat",
    synchronize: true,
    logging: false,
    entities: [
        webTokens,
        logs,
        Accounts
    ],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(async() => {

    api.Log(`Data Source has been initialized`);

    const tokenRepo = AppDataSource.getRepository(webTokens);

    tokenRepo.clear().then(() => api.Log('Flushed old web tokens'));

}).catch(err => {api.Log(err)})