import { Client, GatewayIntentBits, EmbedBuilder, ActivityType, Message, Channel, TextChannel, escapeMarkdown } from 'discord.js';
import apiMethods from '../api/hover.api';
import conf from './discord.conf';
import commandsList from './discord.cmdList';
import commands from './commands/discord.commands';
import { AppDataSource } from '../db/data-source';
import { webTokens } from '../db/entities/hover.webTokens';
import routes from '../hover.routes';

const cmds = new commands();
const api = new apiMethods();
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.login(conf.token);

client.on('ready', async() => {
    client.user.setPresence({
        activities: [{ name: 'hovercraft.chat', type: ActivityType.Playing }],
        status: 'online'
    });

    setInterval(() => {
        const channel = client.channels.cache.get(conf.statChannel) as TextChannel;

        channel.messages.fetch(conf.statMsgId)
        .then(async(message) => {
                const tokenRepo = AppDataSource.getRepository(webTokens);

                const allRecords = await tokenRepo.find();

                const serviceStats = new EmbedBuilder()
                .setColor(0x043667)
                .setTitle('Service Statisics')
                .setDescription('Current service statistics for hovercraft.chat')
                .addFields(
                    { name: 'Endpoint total', value: `${routes.length}`, inline: true },
                    { name: 'Uptime', value: `100.00%`, inline: true },
                    { name: 'Domain', value: `https://hovercraft.chat`, inline: true },
                    { name: 'Total Requests', value: `0`, inline: true },
                    { name: 'Total Current Chat Sessions', value: `${allRecords.length}`, inline: true },
                    { name: 'Total Accounts registered', value: `0`, inline: true }
                )
                .setTimestamp()
                message.edit({ embeds: [serviceStats] });
        })
        .catch(console.error);

    }, conf.statUpdateTime*1000)
});

client.on('messageCreate', async(message: Message<boolean>) => {
    if(conf.botCommandChannels.indexOf(message.channelId) != -1 && message.content.startsWith(conf.prefix)) {
        const args : string[] = message.content.slice(conf.prefix.length).trim().split(' ');
        commandsList.forEach(cmd => {
            if(cmd.commandName == args[0]) {
                cmds[cmd.commandName](message, args);
            }
        })
    }
});

export default function consoleLog(message: any) {
    const channel = client.channels.cache.get('1128890846981410837') as TextChannel;
    channel.send(message);
}