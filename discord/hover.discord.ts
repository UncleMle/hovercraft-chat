import { Client, GatewayIntentBits, EmbedBuilder, ActivityType, Message } from 'discord.js';
import { webTokens } from '../db/entities/hover.webTokens';
import { AppDataSource } from '../db/data-source';
import apiMethods from '../api/hover.api';
import conf from './discord.conf';

const api = new apiMethods();
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });
const prefix = conf.prefix;

client.login(conf.token);

client.on('ready', async() => {
    client.user.setPresence({
        activities: [{ name: 'hovercraft.chat', type: ActivityType.Playing }],
        status: 'online'
    })
});

client.on('messageCreate', async(message: Message<boolean>) => {
    if(!message.content.startsWith(prefix)) return;
    if(conf.botCommandChannels.indexOf(message.channelId) != -1) {
        const args : string[] = message.content.slice(prefix.length).trim().split(' ');

        if(message.content.startsWith(`${prefix}stats`)) {

            AppDataSource.initialize().then(async () => {
                const tokens : object[] = await AppDataSource.manager.find(webTokens);

                const stats : EmbedBuilder = new EmbedBuilder()
                .setColor(0x043667)
                .setTitle('Service information for ***hovercraft.chat***')
                .setDescription('hovercraft.chat')
                .addFields(
                    { name: 'Active Tokens', value: `${tokens.length}`, inline: true },
                )
                .setTimestamp()
                message.channel.send({ embeds: [stats] });
            });

        }

    } else message.channel.send('This command cannot be here.')
});


export default true;