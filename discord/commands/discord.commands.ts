import { EmbedBuilder, Message } from 'discord.js';
import cmdList from '../discord.cmdList';

export default class cmd {

    stats(message: Message<boolean>) {
        const help : EmbedBuilder = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle('Service information for ***hovercraft.chat***')
        .setDescription('hovercraft.chat')
        .addFields(
            { name: 'Help', value: `_`, inline: true },
        )
        .setTimestamp()
        message.channel.send({ embeds: [help] });
    }

    help(message: Message<boolean>) {
        const help : EmbedBuilder = new EmbedBuilder()
        .setColor(0x043667)
        .setTitle(`${JSON.stringify(cmdList)}`)
        .setDescription(`There are currently ${cmdList.length} commands`)
        .setTimestamp()
        message.channel.send({ embeds: [help] });
    }


}
