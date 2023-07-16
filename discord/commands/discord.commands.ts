import { EmbedBuilder, Message } from 'discord.js';
import cmdList from '../discord.cmdList';
import { AppDataSource } from '../../db/data-source';
import { webTokens } from '../../db/entities/hover.webTokens';

export default class cmd {

    stats(message: Message<boolean>) {

        AppDataSource.initialize().then(async () => {

            const tokens = await AppDataSource.manager.find(webTokens);

            const help : EmbedBuilder = new EmbedBuilder()
            .setColor(0x043667)
            .setTitle('Service information for ***hovercraft.chat***')
            .setDescription('hovercraft.chat')
            .addFields(
                { name: 'Current Sessions', value: `${tokens.length}`, inline: true },
            )
            .setTimestamp()
            message.channel.send({ embeds: [help] });
        })
    }

    help(message: Message<boolean>) {
        const help : EmbedBuilder = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle(`${cmdList.forEach(cmd => `${cmdList.indexOf(cmd)}. ${cmd.commandName} | ${cmd.desc}`)}`)
        .setDescription(`There are currently ${cmdList.length} commands`)
        .setTimestamp()
        message.channel.send({ embeds: [help] });
    }


}
