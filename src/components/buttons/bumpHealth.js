module.exports = {
  data: {
    name: 'bumpHealth',
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: '[Buttons] Bumping health',
    });
  },
};