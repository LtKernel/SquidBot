
const fs = require('fs');

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits, } = require('discord.js');
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

// load config variables
// Warning: do not checkin config.json with actual token code included
const config = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Process command files
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Dynamically load and execute commands based on the contents of the commands folder
// Remember to run node deploy-commands.js to register new commands with discord
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// When the client is ready run this code only once
client.once('ready', () => {
    console.log('SquidBot is online. All systems nominal. Weapons hot. Mission: the destruction of any and all Chinese communists.');
});

// Login to Discord with API token credentials
// this must be the last line of the file
client.login(config.token);