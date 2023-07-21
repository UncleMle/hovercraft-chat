import "reflect-metadata";
import { DataSource } from "typeorm";
import apiMethods from '../api/hover.api';

import { webTokens } from "./entities/hover.webTokens";
import { logs } from "./entities/hover.logs";
import { accounts } from "./entities/hover.accounts";

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
        accounts
    ],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(() => {
    api.Log(`Data Source has been initialized`);

    const tokenRepo = AppDataSource.getRepository(webTokens);

    tokenRepo.clear().then(() => api.Log('Flushed old web tokens'));

    const accRepo = AppDataSource.getRepository(accounts);

    const newAcc: accounts = new accounts();
    newAcc.username = 'UncleMole';
    newAcc.password = '$2y$10$K8AKWTug4HLH.JMmNguek.PdcNz/1d/ugCdcb/1sc9VIYg7xlzfgG';
    newAcc.discordAuth = 'None';
    newAcc.createdTime = api.getUnix();
    newAcc.lastActive = api.getUnix();
    newAcc.ip = '127.0.0.1';
    newAcc.banned = false;

    accRepo.save(newAcc).then(acc => api.Log(`created new account with sqlid of ${acc.id}`));

}).catch(err => {api.Log(err)})