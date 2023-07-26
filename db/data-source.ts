import "reflect-metadata";
import { DataSource, Repository } from "typeorm";
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