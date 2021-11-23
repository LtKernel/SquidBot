
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// load config variables
// Warning: do not checkin config.json with actual token code included
const config = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready run this code only once
client.once('ready', () => {
    console.log('SquidBot is online. All systems nominal. Weapons hot. Mission: the destruction of any and all Chinese communists.');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
	}
});

// Login to Discrod with API token credentials
// this must be the last line of the file
client.login(config.token);