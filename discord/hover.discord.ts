import { Client, GatewayIntentBits, EmbedBuilder, ActivityType, Message } from 'discord.js';
import { webTokens } from '../db/entities/hover.webTokens';
import { AppDataSource } from '../db/data-source';
import { DataSource } from 'typeorm';

const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });
const prefix = '=';
const botCmdChannel = '1129540425544376320';

client.login('MTEyODg0MTc2Nzc1Njc1OTA4MA.Gj8-Ek.qP8AhlubB3Ib8BOXSFx2PoafnkIec_VNyl9Fpo');

client.on('ready', (): void => {
    client.user.setPresence({
        activities: [{ name: 'hovercraft.chat', type: ActivityType.Playing }],
        status: 'online'
    })
});

client.on('messageCreate', async(message: Message<boolean>) => {
    if(!message.content.startsWith(prefix)) return;
    if(message.channelId == botCmdChannel) {
        const args : string[] = message.content.slice(prefix.length).trim().split(' ');

        if(message.content.startsWith(`${prefix}stats`)) {

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
        }

    } else message.channel.send('This command cannot be here.')
});


export default true;