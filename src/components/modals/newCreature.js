const { mongoose } = require('mongoose');
const Creature = require('../../schemas/creature');

// todo stats array enum

function parseStats(statsStr) {
  return statsStr.split(',');
}

function validateStats(statsArr) {
  return true;
}

module.exports = {
  data: {
    name: 'newCreature',
  },
  async execute(interaction, client) {

    const statsArr = parseStats(interaction.fields.getTextInputValue('statsInput'));
    if (validateStats(statsArr)) {
      const newCreature = await new Creature({
        _id: mongoose.Types.ObjectId(),
        creature: interaction.fields.getTextInputValue('creatureInput'),
        name: interaction.fields.getTextInputValue('nameInput'),
        map: interaction.fields.getTextInputValue('mapInput'),
        owner: interaction.fields.getTextInputValue('ownerInput'),
        sex: statsArr[0],
        health: parseInt(statsArr[1]),
        stamina: parseInt(statsArr[2]),
        oxygen: parseInt(statsArr[3]),
        food: parseInt(statsArr[4]),
        weight: parseInt(statsArr[5]),
        melee: parseInt(statsArr[6]),
        speed: parseInt(statsArr[7]),
      });

      // todo figure out which library we are adding to
      // todo modal to get inputs on new creature

      await newCreature.save().catch(console.error);


      await interaction.reply({
        content: `Added creature ${interaction.fields.getTextInputValue('nameInput')}`,
        ephemeral: true,
      });
    }
    else {
      console.log('An error parsing new creature info has occurred.')
    }
  }
}