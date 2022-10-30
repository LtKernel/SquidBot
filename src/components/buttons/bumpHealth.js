module.exports = {
  data: {
    name: 'bumpHealth',
  },
  async execute(interaction, client) {

    console.log(`[Health] Value of menu was: ${client.selectedCreature}`);
    // Update the database value

    // Reprint the table
    await interaction.update({
      content: `Bumped Health on ${client.selectedCreature}`,
    });
  },
};