import { Client, GatewayIntentBits, EmbedBuilder, ActivityType, Message } from 'discord.js';
import { webTokens } from '../db/entities/hover.webTokens';
import { AppDataSource } from '../db/data-source';
import apiMethods from '../api/hover.api';
import conf from './discord.conf';
import commandsList from './discord.cmdList';
import commands from './commands/discord.commands';

const cmds = new commands();
const api = new apiMethods();
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });

client.login(conf.token);

client.on('ready', async() => {
    client.user.setPresence({
        activities: [{ name: 'hovercraft.chat', type: ActivityType.Playing }],
        status: 'online'
    })
});

client.on('messageCreate', async(message: Message<boolean>) => {
    if(conf.botCommandChannels.indexOf(message.channelId) != -1 && message.content.startsWith(conf.prefix)) {
        const args : string[] = message.content.slice(conf.prefix.length).trim().split(' ');
        commandsList.forEach(cmd => {
            if(cmd.commandName == args[0]) {
                cmds[cmd.commandName](message);
            }
        })
    }
});


export default true;