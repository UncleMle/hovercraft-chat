import { Client, GatewayIntentBits, EmbedBuilder, ActivityType, Message, Channel, TextChannel, escapeMarkdown, MessagePayload, MessageCreateOptions } from 'discord.js';
import apiMethods from '../api/hover.api';
import conf from './discord.conf';
import commandsList from './discord.cmdList';
import commands from './commands/discord.commands';
import { AppDataSource } from '../db/data-source';
import { webTokens } from '../db/entities/hover.webTokens';
import routes from '../hover.routes';
import { Accounts } from '../db/entities/hover.accounts';
import { Repository } from 'typeorm';
import { CommandList } from './discord.cmdList';
import { Sessions } from '../db/entities/hover.sessions';

const client: Client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.login(conf.token);

client.on('ready', async(): Promise<void> => {
    client.user.setPresence({
        activities: [{ name: 'hovercraft.chat', type: ActivityType.Playing }],
        status: 'online'
    });

    setInterval(() => {
        const channel = client.channels.cache.get(conf.statChannel) as TextChannel;

        channel.messages.fetch(conf.statMsgId)
        .then(async(message): Promise<void> => {


                const allRecords: webTokens[] = await AppDataSource.getRepository(webTokens).find();
                const allAccounts: Accounts[] = await AppDataSource.getRepository(Accounts).find();
                const allSessions: Sessions[] = await AppDataSource.getRepository(Sessions).find();

                const serviceStats: EmbedBuilder = new EmbedBuilder()
                .setColor(0x043667)
                .setTitle('Service Statisics')
                .setDescription('Current service statistics for hovercraft.chat')
                .addFields(
                    { name: 'Endpoint total', value: `${routes.length}`, inline: true },
                    { name: 'Uptime', value: `100.00%`, inline: true },
                    { name: 'Domain', value: `https://hovercraft.chat`, inline: true },
                    { name: 'Total Requests', value: `0`, inline: true },
                    { name: 'Total Current Chat Sessions', value: `${allSessions.length}`, inline: true },
                    { name: 'Total Accounts registered', value: `${allAccounts.length}`, inline: true }
                )
                .setTimestamp()
                message.edit({ embeds: [serviceStats] });
        })
        .catch(console.error);

    }, conf.statUpdateTime*1000)
});

client.on('messageCreate', async(message: Message<boolean>): Promise<void> => {
    if(conf.botCommandChannels.indexOf(message.channelId) != -1 && message.content.startsWith(conf.prefix)) {
        const args : string[] = message.content.slice(conf.prefix.length).trim().split(' ');
        commandsList.forEach((cmd: CommandList)=> {
            if(cmd.commandName == args[0]) {
                commands[cmd.commandName.toLowerCase()](message, args);
            }
        })
    }
});

export default class sendApi {
    public static channelSend(channelId: string, message: string | MessagePayload | MessageCreateOptions): void {
        const channel = client.channels.cache.get(channelId) as TextChannel;
        channel? channel.send(message): (null);
    }

    public static sendEmbed(channelId: string, embed: EmbedBuilder) {
        const channel = client.channels.cache.get(channelId) as TextChannel;
        channel? channel.send({ embeds: [embed] }): (null);
    }
}