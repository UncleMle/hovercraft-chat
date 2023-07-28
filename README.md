# Hovercraft.chat

### A simple and easy to use chat messaging system.
#### Disclaimer: Please Bear mind this project is still very much a work in progress so there may be bugs and or features that are not finished.

<div align="center" style="padding-bottom:2vw; padding-top:2vw;">
<img src="https://i.imgur.com/kosnCeT.png" height=120>
</div>

Hovercraft.chat is a chat platform created using [Express JS](https://expressjs.com), [VueJS](https://vuejs.org/), [TypeORM](https://typeorm.io/), [Axios](https://axios-http.com/docs/intro), [DiscordJS](https://discord.js.org/) **(Intergration)** and [Socket.io](https://socket.io/).

## Things being worked on

- Synced message editing
- Synced message deletion
- Fully intergration account functionality

## How to configure
Head over to ***/discord/discord.conf.ts*** your config will look like this.
```typescript
const config : Config = {
    token: "", // Bot token
    prefix: "=", // Cmd Prefix
    botCommandChannels: ['', ''], // Channel IDs
    botConsoleChannel: '', // Channel ID
    developerRoles: [''], // Role Names eg: Developer Team
    staffRoles: [''], // Role Names eg: Staff Team
    statUpdateTime: 10, // Update time for stat edit
    statChannel: '', // Channel ID
    statMsgId: '', // Channel ID
    clientId: '', // Bot Client ID
    managementChannel: '', // Channel Id
    clientSecret: '', // Bot Client Secret
    redirectUrl: 'http://localhost:8081/auth/discord'
}
```

After configuring the discord intergration you must now setup the postgres database. Head over to ***/db/data-source.ts*** in the typeORM configuration. It should look like this fill in the credentials and ensure you have a created a new database.

```typescript
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "",
    port: 5432,
    username: "",
    password: "",
    database: "",
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
```
After entering your database and the login credentials you can install the web and backend node packages. To do this type ``npm i`` in both the root directory and in ***/client/***. After doing so you can type ``npm run devstart`` in the root directory and then ``npm run serve`` in ***/client/*** to start the vue web development server.

<div align=center>
<h2 style="padding-bottom:1vw;">Landing Page</h2>
<img src="https://i.imgur.com/yaF7NmX.png" height=500>
<h2 style="padding-bottom:1vw;">Chat Page</h2>
<img src="https://i.imgur.com/R1G4Yel.png" height=500>
<img src="https://i.imgur.com/ZPqGbzG.png" height=500>
</div>
