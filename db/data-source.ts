import "reflect-metadata"
import { DataSource } from "typeorm"
import { webTokens } from "./entities/hover.webTokens"

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
