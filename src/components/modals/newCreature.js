const { mongoose } = require('mongoose');
const Creature = require('../../schemas/creature');

module.exports = {
  data: {
    name: 'newCreature',
  },
  async execute(interaction, client) {

    // Add a new creature to the database
    const newCreature = await new Creature({
      _id: mongoose.Types.ObjectId(),
      creature: interaction.fields.getTextInputValue('creatureInput'),
      name: interaction.fields.getTextInputValue('nameInput'),
      map: interaction.fields.getTextInputValue('mapInput'),
      owner: interaction.fields.getTextInputValue('ownerInput'),
      sex: 'Male',
      health: 15,
      stamina: 15,
      oxygen: 15,
      food: 15,
      weight: 15,
      melee: 15,
      speed: 15,
    });

    // todo figure out which library we are adding to
    // todo modal to get inputs on new creature

    await newCreature.save().catch(console.error);


    await interaction.reply({
      content: `Added creature ${interaction.fields.getTextInputValue('nameInput')}`,
      ephemeral: true,
    });
  }
}