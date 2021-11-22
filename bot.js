
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const config = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready run this code only once
client.once('ready', () => {
    console.log('SquidBot is online. All systems nominal. Weapons hot. Mission: the destruction of any and all Chinese communists.');
});

// Login to Discrod with API token credentials
// this must be the last line of the file
client.login(config.token);