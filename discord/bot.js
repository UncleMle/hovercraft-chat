const discord = require('discord.js');
const api = require('../api/api');
const config = require('./botConf.json');
const { Client, GatewayIntentBits, channelLink, messageLink, disableValidators, embedLength, ActivityType } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,] });

client.login(config.TOKEN);
api.log('Discord intergration started');