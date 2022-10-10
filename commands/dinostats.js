const { SlashCommandBuilder } = require('@discordjs/builders');
const { AsciiTable3 } = require('ascii-table3');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const dinoStatsTable = new AsciiTable3()
	.setHeading('ID', 'Dino', 'Health', 'Stamina', 'Oxygen', 'Food', 'Weight', 'Melee', 'Speed')
	.addRow(1, 'Rex', '15', '32', '67', '76', '76', '53', '76')
	.addRow(2, 'Raptor', '18', '62', '67', '76', '76', '53', '76')
	.addRow(3, 'Turtle', '18', '32', '67', '76', '76', '53', '76')
	.addRow(4, 'Giga', '18', '32', '67', '76', '76', '53', '76')
	.removeBorder();


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dinostats')
		.setDescription('Loads the current breeding stats.'),
	async execute(interaction) {
		await interaction.reply({ content: 'Last updated: Friday, November 26, 2021 4:20 PM' + '\r\n' + '`' + dinoStatsTable + '`', components: [row] });
	},
};