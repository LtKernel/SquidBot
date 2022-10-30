require('dotenv').config();
const fs = require('fs');
const { token, database } = process.env;
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Load config variables
// const config = require('../config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Init collection lists
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.commandArray = [];

client.creatureSelections = new Collection();

// Store the currently selected creature.
// This is a temp kludge for testing
client.selectedCreature = 0;

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
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Finally log in to Discord with API token credentials.
client.login(token);

// Connect to the mongo database with database connect string.
(async () => {
  await connect(database).catch(console.error);
})();

