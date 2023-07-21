import { EmbedBuilder, Message } from 'discord.js';
import cmdList from '../discord.cmdList';
import { AppDataSource } from '../../db/data-source';
import { webTokens } from '../../db/entities/hover.webTokens';
import { Accounts } from '../../db/entities/hover.accounts';
import { Channel, TextChannel, Client } from 'discord.js';
import apiMethods from '../../api/hover.api';
import conf from '../discord.conf';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

const api = new apiMethods();

export default class cmd {

    async stats(message: Message<boolean>) {
        const tokenRepo = AppDataSource.getRepository(webTokens);
        const accRepo = AppDataSource.getRepository(Accounts);

        const allRecords = await tokenRepo.find();
        const allAccs = await accRepo.find();

        const help : EmbedBuilder = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle('**Hovercraft.chat | Stats**')
        .setDescription('hovercraft.chat')
        .addFields(
            { name: 'Current Sessions', value: `${allRecords.length}`, inline: true },
            { name: 'Total Accounts', value: `${allAccs.length}`, inline: true },
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
            { name: 'Perms: ``everyone`` | '+`${conf.prefix}help`, value: `view all available commands`, inline: true },
            { name: 'Perms: ``everyone`` | '+`${conf.prefix}stats`, value: `View service statistics`, inline: true },
            { name: 'Perms: ``Developer, Staff`` | '+`${conf.prefix}accinfo`, value: `View information about an account via UUID`, inline: true }
        )
        .setTimestamp()
        message.channel.send({ embeds: [help] });
    }

    async accinfo(message: Message<boolean>, args: string[]) {
        if(!args[1]) { return missingParam(message, 'accinfo', ['sqlid']) };
        const accRepo = AppDataSource.getRepository(Accounts);

        accRepo.findOne({ where: { id: parseInt(args[1]) } }).then(account => {
            if(!account) return errEmbed(message, 'accinfo', 'No account was found with SQLID ``'+args[1]+'``');
            const accountInfo: EmbedBuilder = new EmbedBuilder()
            .setColor(0x043667)
            .setTitle(`**Hovercraft.chat | Account Info**`)
            .setDescription(`Account info for account with UUID `+'``'+account.UUID+'``')
            .addFields(
                { name: 'Last Active', value: `${api.formatUnixTimestamp(account.lastActive)}`, inline: true },
                { name: 'Created at', value: `${api.formatUnixTimestamp(account.createdTime)}`, inline: true },
            )
            .setTimestamp()
            message.channel.send({ embeds: [accountInfo] });
        });

    }

}

function missingParam(message: Message<boolean>, commandName: string, missingParams: string[]) {
    const resEmbed: EmbedBuilder = new EmbedBuilder()
    .setColor(0x043667)
    .setTitle(`**${conf.prefix}${commandName}**`)
    .setDescription(`Missing parameter ***${missingParams.join(' ')}***`)
    .setTimestamp();
    message.channel.send({ embeds: [resEmbed] });
}

function errEmbed(message: Message<boolean>, commandName: string, errorName: string) {
    const errEmbed: EmbedBuilder = new EmbedBuilder()
    .setColor(0xf54242)
    .setTitle(`**Hovercraft.chat | ${conf.prefix}${commandName}**`)
    .setDescription(`${errorName}`)
    .setTimestamp()
    message.channel.send({ embeds: [errEmbed] });
}

