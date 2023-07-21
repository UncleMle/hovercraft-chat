import { EmbedBuilder, Message } from 'discord.js';
import cmdList from '../discord.cmdList';
import { AppDataSource } from '../../db/data-source';
import { webTokens } from '../../db/entities/hover.webTokens';
import { Accounts } from '../../db/entities/hover.accounts';
import { Channel, TextChannel, Client } from 'discord.js';
import apiMethods from '../../api/hover.api';
import conf from '../discord.conf';
import { Repository } from 'typeorm';

const api = new apiMethods();

export default class cmd {

    async servicestats(message: Message<boolean>): Promise<void> {
        if(!await cmdApi.checkAuth(message, conf.staffRoles)) return;

        const tokenRepo = AppDataSource.getRepository(webTokens);
        const accRepo: Repository<Accounts> = AppDataSource.getRepository(Accounts);

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
            { name: 'Perms: ``Staff`` | '+`${conf.prefix}help`, value: `${cmdApi.getDesc('help')}`, inline: true },
            { name: 'Perms: ``everyone`` | '+`${conf.prefix}stats`, value: `${cmdApi.getDesc('servicestats')}`, inline: true },
            { name: 'Perms: ``Developer, Staff`` | '+`${conf.prefix}accinfo`, value: `${cmdApi.getDesc('accinfo')}`, inline: true }
        )
        .setTimestamp()
        message.channel.send({ embeds: [help] });
    }

    async accinfo(message: Message<boolean>, args: string[]): Promise<Message<boolean> | void> {
        if(!await cmdApi.checkAuth(message, conf.developerRoles)) return;

        if(!args[1]) { return cmdApi.missingParam(message, 'accinfo', ['sqlid']) };

        const accRepo: Repository<Accounts> = AppDataSource.getRepository(Accounts);

        accRepo.findOne({ where: { id: parseInt(args[1]) } }).then(account => {
            if(!account) return cmdApi.errEmbed(message, 'accinfo', 'No account was found with SQLID ``'+args[1]+'``');
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

class embedHandles {

    missingParam(message: Message<boolean>, commandName: string, missingParams: string[]): void {
        const resEmbed: EmbedBuilder = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle(`**${conf.prefix}${commandName}**`)
        .setDescription(`Missing parameter ***${missingParams.join(' ')}***`)
        .setTimestamp();
        message.channel.send({ embeds: [resEmbed] });
    }

    errEmbed(message: Message<boolean>, commandName: string, errorName: string): void {
        const errEmbed: EmbedBuilder = new EmbedBuilder()
        .setColor(0xf54242)
        .setTitle(`**Hovercraft.chat | ${conf.prefix}${commandName}**`)
        .setDescription(`${errorName}`)
        .setTimestamp()
        message.channel.send({ embeds: [errEmbed] });
    }

    noauth(message: Message<boolean>, commandName: string): void {
        const errEmbed: EmbedBuilder = new EmbedBuilder()
        .setColor(0xf54242)
        .setTitle(`**Hovercraft.chat | ${conf.prefix}${commandName}**`)
        .setDescription(`You do not have authorization to access this resource`)
        .setTimestamp()
        message.channel.send({ embeds: [errEmbed] });
    }

    async checkAuth(message: Message<boolean>, roles: string[]): Promise<Boolean> {
        let hasAuth: Boolean = false;

        message.member.roles.cache.some(role => {
            if(roles.indexOf(role.name) != -1) {
                hasAuth = true;
            }
        });

        return hasAuth;
    }

    getDesc(commandName: string): string[] {
        return cmdList.map(x => x.commandName === commandName ? x.desc:(null));
    }

}

const cmdApi = new embedHandles();
