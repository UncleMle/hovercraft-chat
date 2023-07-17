import { EmbedBuilder, Message } from 'discord.js';
import cmdList from '../discord.cmdList';
import { AppDataSource } from '../../db/data-source';
import { webTokens } from '../../db/entities/hover.webTokens';
import { Channel, TextChannel, Client } from 'discord.js';

export default class cmd {

    async stats(message: Message<boolean>) {

        /**
         *  {\typeorm\data-source\DataSource.js:131} Remove error throw on init
         */
        const tokenRepo = AppDataSource.getRepository(webTokens);

        const allRecords = await tokenRepo.find();

        const help : EmbedBuilder = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle('**Hovercraft.chat | Stats**')
        .setDescription('hovercraft.chat')
        .addFields(
            { name: 'Current Sessions', value: `${allRecords.length}`, inline: true },
        )
        .setTimestamp()
        message.channel.send({ embeds: [help] });

    }

    help(message: Message<boolean>): void {
        const help = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle(`**Hovercraft.chat | Help**`)
        .setDescription(`There are currently ***${cmdList.length}*** commands available`)
        .addFields(
            { name: 'help', value: `view all available commands`, inline: true },
            { name: 'stats', value: `View service statistics`, inline: true }
        )
        .setTimestamp()
        message.channel.send({ embeds: [help] });
    }
}

