import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
import apiMethods from '../api/hover.api';
import bcrypt from 'bcrypt';

import { webTokens } from "./entities/hover.webTokens";
import { logs } from "./entities/hover.logs";
import { Accounts } from "./entities/hover.accounts";
import { Sessions } from "./entities/hover.sessions";
import { openSockets } from "./entities/hover.openSockets";

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
        Accounts,
        Sessions,
        openSockets
    ],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(async() => {

    apiMethods.Log(`Data Source has been initialized`);

    const tokenRepo: Repository<webTokens> = AppDataSource.getRepository(webTokens);
    const sessions: Repository<Sessions> = AppDataSource.getRepository(Sessions);
    const openSockes: Repository<openSockets> = AppDataSource.getRepository(openSockets);

    tokenRepo.clear().then(() => apiMethods.Log('Flushed old web tokens'));
    sessions.clear().then(() => apiMethods.Log('Flushed old sessions'));
    openSockes.clear().then(() => apiMethods.Log('Flushed old open sockets'));


}).catch(err => {apiMethods.Log(err)})