const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'bumpHealth',
  },
  async execute(interaction, client) {

    // Get the current value of the menu
    // interaction.values[0];

    // Update the database value

    // Reprint the table

    await interaction.update({
      content: 'test',

    });
  },
};