const { SlashCommandBuilder } = require('@discordjs/builders');
const { AsciiTable3 } = require('ascii-table3');
// const { ClientInvalidOption } = require('discord.js/src/errors/ErrorCodes');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

// Load the stats database
const statsJson = require('../stats.json');

// Mobile-friendly output
const compact = false;

function compactServer(server) {
	return compact ? {
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
	}[server] : server;
}

function compactSex(sex) {
	return compact ? {
		'Male': 'M',
		'Female': 'F',
	}[sex] : sex;
}

function getHelp() {
	return 'todo: say something useful about the best command';
}

/**
* Retrieves creature stats from the JSON database and returns
* the best stats for each found creature type in the form of an AsciiTable3
* @param {String} statName - The stat type you want to search for
  @returns {AsciiTable3} A table of creature statistics.
*/
function getBestStats() {

	const statsTable = new AsciiTable3();
	statsTable.removeBorder();

	// a list of unique creature types
	const creatures = [];
	// a list of their associated best stats
	const topHealth = [];
	const topStamina = [];
	const topOxygen = [];
	const topFood = [];
	const topWeight = [];
	const topMelee = [];
	const topSpeed = [];

	if (compact) {
		statsTable.setHeading('ID', 'Creature', 'HP', 'St', 'Ox', 'Fo', 'We', 'Dm', 'Sp');
	}
	else {
		statsTable.setHeading('ID', 'Creature', 'Health', 'Stamina', 'Oxygen', 'Food', 'Weight', 'Melee', 'Speed');
	}

	statsJson.Database.Libraries.forEach((library) => {

		// Create a list of unique Creatures as we encounter them in the JSON database
		// If we encounter an existing one and it's stat is higher, save it for later
		library.Dinos.forEach(function(dino) {

			// Search the unique creature type list
			const index = creatures.indexOf(dino.Creature);

			// if this is a new creature type not found in our list
			// its stats are the best by default so record them.
			if (index < 0) {
				creatures.push(dino.Creature);
				topHealth.push(dino.Health);
				topStamina.push(dino.Stamina);
				topOxygen.push(dino.Oxygen);
				topFood.push(dino.Food);
				topWeight.push(dino.Weight);
				topMelee.push(dino.Melee);
				topSpeed.push(dino.Speed);
			}
			else {
				// this is a creature type we've seen before so compare the stats
				// overwrite the old stats if this creature has better ones
				if (topHealth[index] < dino.Health) {
					topHealth[index] = dino.Health;
				}
				if (topStamina[index] < dino.Stamina) {
					topStamina[index] = dino.Stamina;
				}
				if (topOxygen[index] < dino.Oxygen) {
					topOxygen[index] = dino.Oxygen;
				}
				if (topFood[index] < dino.Food) {
					topFood[index] = dino.Food;
				}
				if (topWeight[index] < dino.Weight) {
					topWeight[index] = dino.Weight;
				}
				if (topMelee[index] < dino.Melee) {
					topMelee[index] = dino.Melee;
				}
				if (topSpeed[index] < dino.Speed) {
					topSpeed[index] = dino.Speed;
				}
			}
		});
	});

	// build a table using the best stats we found for each creature
	for (let index = 0; index < creatures.length; index++) {
		statsTable.addRow(
			index + 1,
			creatures[index],
			topHealth[index],
			topStamina[index],
			topOxygen[index],
			topFood[index],
			topWeight[index],
			topMelee[index],
			topSpeed[index],
		);
	}

	return statsTable.rows.length > 0 ? statsTable : null;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('best')
		.setDescription('Finds the hypothetical best possible stats that can be bread based on creatures across all libraries')
		.addStringOption(option =>
			option.setName('help')
				.setDescription('Get help with this command')
				.setRequired(false)),
	async execute(interaction) {
		// Grab the libary name entered after the slash command
		const optionStr = interaction.options.getString('best');

		// Special case: if "help" is entered just print help info
		if (optionStr == 'help') {
			await interaction.reply({ content: `${getHelp()}` });
		}
		// Otherwise attempt to retrieve the best possible stats from across all libraries
		else {
			const bestCreatures = getBestStats();
			// Disaply the results
			if (bestCreatures) {
				// Build the 2nd button row after the table.
				const row1 = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId('refresh')
						.setStyle('Primary')
						.setEmoji('🔄')
						.setLabel('Refresh'),
				);
				await interaction.reply({ content: 'Last updated: todo' + '\r\n\r\n' + 'The best hypothetical stats that can be be bread with the current creatures across all libraries:\r\n' + '`' + bestCreatures.toString() + '`', components: [row1]});
			}
			else {
				await interaction.reply({ content: 'Error: could not find any creatures.' });
			}
		}
	},
};