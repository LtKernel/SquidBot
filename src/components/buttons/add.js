const Creature = require('../../schemas/creature');
const { mongoose } = require('mongoose');

module.exports = {
  data: {
    name: 'add',
  },

  async execute(interaction, client) {

    // Add a new creature to the database
    const newCreature = await new Creature({
      _id: mongoose.Types.ObjectId(),
      health: 15,
    });

    await newCreature.save().catch(console.error);

    // Reprint the table
    await interaction.update({
      content: `Add creature: ${newCreature._id}`,
    });
  },
};