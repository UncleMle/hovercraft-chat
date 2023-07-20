import "reflect-metadata";
import { DataSource } from "typeorm";
import apiMethods from '../api/hover.api';

import { webTokens } from "./entities/hover.webTokens";
import { logs } from "./entities/hover.logs";

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
        logs
    ],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(() => {
    api.Log(`Data Source has been initialized`);

    const tokenRepo = AppDataSource.getRepository(webTokens);

    tokenRepo.clear().then(() => api.Log('Flushed old web tokens'));
}).catch(err => {api.Log(err)})