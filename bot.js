const config = require('config.json');
const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log('SquidBot is online. All systems nominal. Weapons hot. Mission: the destruction of any and all Chinese communists.');
});

// this must be the last line of the file
client.login(config.token);