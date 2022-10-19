require('dotenv').config();
const fs = require('fs');
const { token, database } = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Load config variables
// const config = require('../config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Init command lists
client.commands = new Collection();
client.commandArray = [];

// Grab all the handlers from the functions folders to handle
// all commands and events and pass the client into each.
const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// Call the handler functions.
client.handleCommands();
client.handleEvents();

// Finally log in to Discord with API token credentials.
client.login(token);

// Connect to the mongo database with database connect string.
(async () => {
  await connect(database).catch(console.error);
})();

