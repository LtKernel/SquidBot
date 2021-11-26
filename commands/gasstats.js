const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { AsciiTable3 } = require('ascii-table3');

const gasTable = new AsciiTable3()
	.setHeading('', 'Name', 'Age')
	.addRow(1, 'Bob', 52)
	.addRow(2, 'John', 34)
	.addRow(3, 'Jim', 83)
	.removeBorder();

// inside a command, event listener, etc.
const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Generator Fuel Status')
	// .setURL('https://discord.js.org/')  <-- will link to a gas webpage someday
	.setDescription('Projects how much longer a generator will remain online based on the amount of fuel last observed in it.')
	.setThumbnail('https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/6/6e/Gasoline.png/revision/latest?cb=20150615125445')
	.addField('Table', '`' + gasTable.toString() + '`', false)
	.setTimestamp()
	.setFooter('Last refreshed:', 'https://i.imgur.com/AfFp7pu.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gasstats')
		.setDescription('Loads the gasstats.'),
	async execute(interaction) {
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};