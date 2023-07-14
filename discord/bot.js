const api = require('../api/api');
const config = require('./botConf.json');
const { EmbedBuilder } = require('discord.js');
const { Client, GatewayIntentBits, channelLink, messageLink, disableValidators, embedLength, ActivityType } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });
const routes = require('../routes');
const db = require('../models');

client.login(config.TOKEN).then(() => {
    client.user.setPresence({
        activities: [{ name: `hovercraft.chat`, type: ActivityType.Playing }],
        status: 'online',
    });
})

client.on('ready', () => {
    api.log('Discord intergration has started.');
    client.user.setUsername('Hover Bot');

    exports.sendMsg = function sendChannelMsg(channelId, message) {
        const channel = client.channels.cache.get(channelId);
        channel.send('``'+api.srvTime()+'``'+` | ${message}`);
    }

    setInterval(() => {
        const channel = client.channels.cache.get("1128895284106240114");
        channel.messages.fetch('1129109544669298739')
        .then(async(message) => {
            const serviceStats = new EmbedBuilder()
            .setColor(0x043667)
            .setTitle('Service Statisics')
            .setDescription('Current service statistics for hovercraft.chat')
            .addFields(
                { name: 'Endpoint total', value: `${routes.routes.length}`, inline: true },
                { name: 'Api Uptime', value: `100.00%`, inline: true },
                { name: 'Frontend Uptime', value: `100.00%`, inline: true },
                { name: 'Domain', value: `https://${config.domain}`, inline: true },
                { name: 'Total Chat Sessions', value: `${await db.chat_sessions.findAll({}).then(csid => csid.length)}`, inline: true },
                { name: 'Total Accounts registered', value: `${await db.accounts.findAll({}).then(acc => acc.length)}`, inline: true },
                { name: 'Total Requests sent', value: `${await db.web_tokens.findAll({}).then(tokens => tokens.length)}`, inline: true }
            )
            .setTimestamp()
            message.edit({ embeds: [serviceStats] });
        })
        .catch(console.error);
    }, config.UpdateInter*1000);

});
