import { EmbedBuilder, Message } from 'discord.js';
import cmdList from '../discord.cmdList';
import { AppDataSource } from '../../db/data-source';
import { webTokens } from '../../db/entities/hover.webTokens';
import { Accounts } from '../../db/entities/hover.accounts';
import { Channel, TextChannel, Client } from 'discord.js';
import apiMethods from '../../api/hover.api';
import conf from '../discord.conf';
import { Repository, SelectQueryBuilder } from 'typeorm';
import dcApi from '../hover.discord';

const api = new apiMethods();

export default class cmd {

    public async servicestats(message: Message<boolean>): Promise<void> {
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

    public help(message: Message<boolean>): void {
        const help = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle(`**Hovercraft.chat | Help**`)
        .setDescription(`There are currently ***${cmdList.length}*** commands available`)
        .addFields(
            { name: 'Perms: ``Staff`` | '+`${conf.prefix}help`, value: `${cmdApi.getDesc('help')}`, inline: true },
            { name: 'Perms: ``everyone`` | '+`${conf.prefix}stats`, value: `${cmdApi.getDesc('servicestats')}`, inline: true },
            { name: 'Perms: ``Developer, Staff`` | '+`${conf.prefix}accinfo`, value: `${cmdApi.getDesc('accinfo')}`, inline: true },
            { name: 'Perms: ``Developer, Staff`` | '+`${conf.prefix}banacc`, value: `${cmdApi.getDesc('banacc')}`, inline: true },
            { name: 'Perms: ``Developer, Staff`` | '+`${conf.prefix}unbanacc`, value: `${cmdApi.getDesc('unbanacc')}`, inline: true }
        )
        .setTimestamp()
        message.channel.send({ embeds: [help] });
    }

    public async accinfo(message: Message<boolean>, args: string[]): Promise<Message<boolean> | void> {
        if(!await cmdApi.checkAuth(message, conf.developerRoles)) return;

        if(!args[1]) return cmdApi.missingParam(message, 'accinfo', ['sqlid']);

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
                { name: 'Is banned', value: `${account.banned? 'Banned': 'Not banned'}`, inline: true },
            )
            .setTimestamp()
            message.channel.send({ embeds: [accountInfo] });
        });
    }

    public async banacc(message: Message<boolean>, args: string[]): Promise<Message<boolean> | void> {
        if(!await cmdApi.checkAuth(message, conf.staffRoles)) return;
        const discordApi = new dcApi();

        if(!args[1]) return cmdApi.missingParam(message, 'banacc', ['sqlid', 'reason']);

        if(!args[2]) return cmdApi.missingParam(message, 'banacc', ['reason']);

        const reason = args.slice(2).join(' ');
        const accRepo: Repository<Accounts> = AppDataSource.getRepository(Accounts);

        accRepo.findOne({ where: { id: parseInt(args[1]) } }).then(acc => {
            if(!acc) return cmdApi.errEmbed(message, 'banacc', `No account was found with SQLID: `+'``'+args[1]+'``');
            if(acc.banned) return cmdApi.errEmbed(message, 'banacc', `This account is already banned`);

            accRepo.update({ id: parseInt(args[1]) }, {
                banned: true
            }).then(async() => {
                const bannedAccount = await accRepo.findOne({ where: { id: parseInt(args[1]) } });
                if(!bannedAccount) return;

                const successEmbed: EmbedBuilder = new EmbedBuilder()
                .setColor(0xf54242)
                .setTitle(`**Hovercraft.chat | ${conf.prefix}banacc**`)
                .setDescription(`${message.author} banned ${bannedAccount.username}. UUID: `+'``'+bannedAccount.UUID+'``'+` with reason: ${reason}`)
                .setTimestamp()

                discordApi.sendEmbed(conf.botConsoleChannel, successEmbed);
                cmdApi.success(message, 'banacc', 'You banned user with SQLID: ``'+bannedAccount.id+'`` UUID: ``'+bannedAccount.UUID+'`` Username: '+bannedAccount.username+ ' from the hovercraft.chat messaging service.');
            })
        })
    }

    public async unbanacc(message: Message<boolean>, args: string[]): Promise<Message<boolean> | void> {
        if(!await cmdApi.checkAuth(message, conf.staffRoles)) return;

        if(!args[1]) return cmdApi.missingParam(message, 'unbanacc', ['sqlid']);

        const accRepo = AppDataSource.getRepository(Accounts);
        const discordApi = new dcApi();

        accRepo.findOne({ where: {id: parseInt(args[1])} }).then(account => {
            if(!account) return cmdApi.errEmbed(message, 'unbanacc', `No account was found with SQLID: ${args[1]}`);
            if(!account.banned) return cmdApi.errEmbed(message, 'unbanacc', 'This user is not banned');
            accRepo.update({ id: parseInt(args[1]) }, {
                banned: false
            }).then(async() => {
                const unbannedAcc = await accRepo.findOne({ where: {id: parseInt(args[1])} });
                if(!unbannedAcc) return;

                const successEmbed: EmbedBuilder = new EmbedBuilder()
                .setColor(0x4beb76)
                .setTitle(`**Hovercraft.chat | ${conf.prefix}unbanacc**`)
                .setDescription(`${message.author} unbanned ${unbannedAcc.username}. UUID: `+'``'+unbannedAcc.UUID+'``')
                .setTimestamp()

                discordApi.sendEmbed(conf.botConsoleChannel, successEmbed);
                cmdApi.success(message, 'banacc', 'You unbanned user with SQLID: ``'+unbannedAcc.id+'`` UUID: ``'+unbannedAcc.UUID+'`` Username: '+unbannedAcc.username+ ' from the hovercraft.chat messaging service.');

            })
        })

    }

}

class apiHandles {

    public missingParam(message: Message<boolean>, commandName: string, missingParams: string[]): void {
        const resEmbed: EmbedBuilder = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle(`**${conf.prefix}${commandName}**`)
        .setDescription(`Missing parameter ***${missingParams.join(',')}***`)
        .setTimestamp();
        message.channel.send({ embeds: [resEmbed] });
    }

    public errEmbed(message: Message<boolean>, commandName: string, errorName: string): void {
        const errEmbed: EmbedBuilder = new EmbedBuilder()
        .setColor(0xf54242)
        .setTitle(`**Hovercraft.chat | ${conf.prefix}${commandName}**`)
        .setDescription(`${errorName}`)
        .setTimestamp()
        message.channel.send({ embeds: [errEmbed] });
    }

    public noauth(message: Message<boolean>, commandName: string): void {
        const errEmbed: EmbedBuilder = new EmbedBuilder()
        .setColor(0xf54242)
        .setTitle(`**Hovercraft.chat | ${conf.prefix}${commandName}**`)
        .setDescription(`You do not have authorization to access this resource`)
        .setTimestamp()
        message.channel.send({ embeds: [errEmbed] });
    }

    public async checkAuth(message: Message<boolean>, roles: string[]): Promise<Boolean> {
        let hasAuth: Boolean = false;

        message.member.roles.cache.some(role => {
            if(roles.indexOf(role.name) != -1) {
                hasAuth = true;
            }
        });

        return hasAuth;
    }

    public getDesc(commandName: string): string[] {
        return cmdList.map(x => x.commandName === commandName ? x.desc:(null));
    }

    public success(message: Message<boolean>, commandName: string, successMsg: string): void {
        const successEmbed: EmbedBuilder = new EmbedBuilder()
        .setColor(0x4beb76)
        .setTitle(`**Hovercraft.chat | ${conf.prefix}${commandName}**`)
        .setDescription(`${successMsg}`)
        .setTimestamp()
        message.channel.send({ embeds: [successEmbed] });
    }

}

const cmdApi: apiHandles = new apiHandles();
