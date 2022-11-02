module.exports = {
  data: {
    name: 'newCreature',
  },
  async execute(interaction, client) {
    await interaction.reply({
      content: `You said your favoriete colos is ${interaction.fields.getTextInputValue('favoriteColorInput')}`,
    });
  }
}