const { SlashCommandBuilder } = require('@discordjs/builders');
const { AsciiTable3 } = require('ascii-table3');
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Load the stats database
const stats = require('../stats.json');

const statsTable = new AsciiTable3();

stats.Database.Libraries.forEach(function(library) {
	// if(library.Name == ARG)
	statsTable.setHeading('Dino', 'Server', 'Owner', 'Sex', 'Health', 'Stamina', 'Oxygen', 'Food', 'Weight', 'Melee', 'Speed');
	library.Dinos.forEach(function(dino) {
		statsTable.addRow(dino.Creature,
			dino.Server,
			dino.Owner,
			dino.Sex,
			dino.Health,
			dino.Stamina,
			dino.Oxygen,
			dino.Food,
			dino.Weight,
			dino.Melee,
			dino.Speed);
	});
	statsTable.removeBorder();
	console.log(statsTable.toString());
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dinostats')
		.setDescription('Loads the current breeding stats.')
		.addStringOption(option =>
			option.setName('input')
				.setDescription('The input to echo back')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply({ content: 'Last updated: Friday, November 26, 2021 4:20 PM' + '\r\n' + '`' + statsTable + '`' });
	},
};