const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// loop through all the files in the command folder
// to create the commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Note: To make the commands global across Discord, remove the guildID parameter.
// However it might take an hour to propogate
const rest = new REST({ version: '9' }).setToken(token);
console.log('Started registering application (/) commands.');
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application (/) commands.'))
	.catch(console.error);