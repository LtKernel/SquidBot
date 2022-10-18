// const { MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'statsInteractions',
	async execute(interaction) {
		if (!interaction.isButton()) {
			return;
		}
		else if (interaction.isButton()) {
			interaction.reply('you clicked' + interaction.customId);
			console.log(interaction);

			if (interaction.customId === 'health') {
				console.log(`${interaction.user.tag} in #${interaction.channel.name} clicked the health button.`);

				return interaction.update({
					content: 'Hey',
					ephemeral: true,
				});
			}
		}
	},
};