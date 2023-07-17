import "reflect-metadata";
import { DataSource } from "typeorm";
import { webTokens } from "./entities/hover.webTokens";
import apiMethods from '../api/hover.api';

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
    entities: [webTokens],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(() => {
    api.Log(`Data Source has been initialized`);
}).catch(err => {api.Log(err)})