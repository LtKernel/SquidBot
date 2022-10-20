// const { model } = require("mongoose");

module.exports = {
  data: {
    name: 'creatureMenu',
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `You selected: ${interaction.values[0]}`,
      ephemeral: true,
    });
  },
};