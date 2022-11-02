const Creature = require('../../schemas/creature');
const { mongoose } = require('mongoose');
const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');

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

    // todo figure out which library we are adding to
    // todo modal to get inputs on new creature

    await newCreature.save().catch(console.error);

    // Reprint the table
    /* await interaction.update({
      content: `Add creature: ${newCreature._id}`,
    }); */

    const modal = new ModalBuilder()
      .setCustomId('newCreature')
      .setTitle('New Creature...');

    const creatureInput = new TextInputBuilder()
      .setCustomId('creatureInput')
      .setLabel('What species of creature are you adding?')
      .setRequired(true)
      .setMaxLength(16)
      .setStyle(TextInputStyle.Short);
      // todo automplete creature type

    const nameInput = new TextInputBuilder()
      .setCustomId('nameInput')
      .setLabel('What is the creature name?')
      .setRequired(true)
      .setMaxLength(16)
      .setValue('Breeder')
      .setStyle(TextInputStyle.Short);

    const mapInput = new TextInputBuilder()
      .setCustomId('mapInput')
      .setLabel('What map is the creature located on?')
      .setRequired(true)
      .setMaxLength(16)
      .setValue('The Island')
      .setStyle(TextInputStyle.Short);

    const ownerInput = new TextInputBuilder()
      .setCustomId('ownerInput')
      .setLabel('Who is the creature owner?')
      .setRequired(true)
      .setMaxLength(16)
      .setValue('Tribe')
      .setStyle(TextInputStyle.Short);

    // This input is messy.  Discord modal prompts only allow 6 inputs
    // So gather all stats in on prompt
    const statsInput = new TextInputBuilder()
      .setCustomId('statsInput')
      .setLabel('What are the stats?')
      .setRequired(true)
      .setMaxLength(32)
      .setValue('(Sex,HP,St,Ox,Fo,We,Dm,Sp)')
      .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(creatureInput));
    modal.addComponents(new ActionRowBuilder().addComponents(nameInput));
    modal.addComponents(new ActionRowBuilder().addComponents(mapInput));
    modal.addComponents(new ActionRowBuilder().addComponents(ownerInput));
    modal.addComponents(new ActionRowBuilder().addComponents(statsInput));

    await interaction.showModal(modal);
  },
};