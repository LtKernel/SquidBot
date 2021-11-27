const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { AsciiTable3 } = require('ascii-table3');

const gasTable = new AsciiTable3()
	.setHeading('', 'Base', 'Generator', 'Coords', 'Tek', 'Main', 'Standby', 'Elem','Shards', 'Radius', 'Tek/hr', 'Gas', 'Obs Data', 'Rem Shards', 'Rem Gas', 'Projected Depletion')
	.addRow(1, 'Tree of Life', 'Central', '52/32', 'Yes', 'No', 'No', '53', '1000', '10', '3.7', 'NA', '11/26/2021', '100', 'NA', '11/26/2021')
	.addRow(1, 'Tree of Life', 'Central', '52/32', 'Yes', 'No', 'No', '53', '1000', '10', '3.7', 'NA', '11/26/2021', '100', '11/26/2021')
	.addRow(2, 'Foundtain of Life', 'Central', '52/32', 'Yes', 'No', 'No', '53', '1000', '10', '3.7', 'NA', '11/26/2021', '11/26/2021')
	.addRow(2, 'Foundtain of Life', 'Central', '52/32', 'Yes', 'No', 'No', '53', '1000', '10', '3.7', 'NA', '11/26/2021', '11/26/2021')
	.removeBorder();

// inside a command, event listener, etc.
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Generator Fuel Status')
	// .setURL('https://discord.js.org/')  <-- will link to a gas webpage someday
	.setDescription('Projects how much longer a generator will remain online based on the amount of fuel last observed in it.')
	.setThumbnail('https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/6/6e/Gasoline.png/revision/latest?cb=20150615125445')
	.setTimestamp()
	.setFooter('Last refreshed:', 'https://i.imgur.com/AfFp7pu.png');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('gas')
		.setDescription('Loads the current fuel levels.'),
	async execute(interaction) {
		await interaction.reply('Last updated: Friday, November 26, 2021 4:20 PM' + '\r\n' + '`' + gasTable + '`');
		await interaction.followUp({ embeds: [exampleEmbed] });
	},
};