const { SlashCommandBuilder } = require('@discordjs/builders');
const { AsciiTable3 } = require('ascii-table3');
const { ClientInvalidOption } = require('discord.js/src/errors/ErrorCodes');
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Load the stats database
const statsJson = require('../stats.json');

// Mobile-friendly output
const compact = false;

function compactServer(server) {
	return {
		'The Island': 'TI',
		'Scorched Earth': 'SE',
		'Abberation': 'AB',
		'Extinction': 'EX',
		'Genesis: Part 1': 'G1',
		'Genesis: Part 2': 'G2',
		'The Center': 'TC',
		'Ragnarok': 'RA',
		'Valguaro': 'VA',
		'Crystal Isles': 'CI',
		'Los Island': 'LI',
		default: '??',
	}[server];
}

function compactSex(sex) {
	return {
		'Male': 'M',
		'Female': 'F',
		default: '?',
	}[sex];
}

function getLibrary(name) {

	const statsTable = new AsciiTable3();
	statsTable.removeBorder();

	if (compact) {
		statsTable.setHeading('Creature', 'Srv', 'Owner', 'Ge', 'HP', 'St', 'Ox', 'Fo', 'We', 'Dm', 'Sp');
	}
	else {
		statsTable.setHeading('Creature', 'Server', 'Owner', 'Sex', 'Health', 'Stamina', 'Oxygen', 'Food', 'Weight', 'Melee', 'Speed');
	}

	statsJson.Database.Libraries.forEach((library) => {
		if (library.Name == name) {
			library.Dinos.forEach(function(dino) {
				statsTable.addRow(
					dino.Creature,
					compactServer(dino.Server),
					dino.Owner,
					compactSex(dino.Sex),
					dino.Health,
					dino.Stamina,
					dino.Oxygen,
					dino.Food,
					dino.Weight,
					dino.Melee,
					dino.Speed);
			});
		}
	});

	return statsTable.rows.length > 0 ? statsTable.toString() : `Could not find a libary named ${name}`;
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Loads the current breeding stats.')
		.addStringOption(option =>
			option.setName('library')
				.setDescription('The stats library to accesss. Enter /"List/" to see available libraries')
				.setRequired(true)),
	async execute(interaction) {
		const libraryName = interaction.options.getString('library');
		await interaction.reply({ content: 'Last updated: Friday, November 26, 2021 4:20 PM' + '\r\n' + '`' + getLibrary(libraryName) + '`' });
	},
};