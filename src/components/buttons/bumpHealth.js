module.exports = {
  data: {
    name: 'bumpHealth',
  },
  async execute(interaction, client) {

    // Get the current value of the menu
    // interaction.values[0];
    const selected = client.selectMenus.values[0];

    console.log(`[Health] Value of menu was: ${selected}`);
    // Update the database value

    // Reprint the table
    await interaction.update({
      content: `Bumped Health on ${selected}`,
    });
  },
};