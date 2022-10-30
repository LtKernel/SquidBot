module.exports = {
  data: {
    name: 'creatureMenu',
  },
  async execute(interaction, client) {
    const message = await interaction.update({
      content: `You selected: ${client.selectedCreature}`,
      ephemeral: true,
    });
    // Record that this selection was made for this message
    client.creatureSelections.set(message.id, client.selectedCreature);
    console.log('selections:\r\n');
    console.log(client.creatureSelections);
  },
};