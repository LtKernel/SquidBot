const { SlashCommandBuilder } = require('@discordjs/builders');
const { AsciiTable3 } = require('ascii-table3');
// const { ClientInvalidOption } = require('discord.js/src/errors/ErrorCodes');
const { ActionRowBuilder, ButtonBuilder, SelectMenuBuilder } = require('discord.js');

// Load the stats database
const statsJson = require('../../data/stats.json');

// Mobile-friendly output
const compact = true;

function compactServer(server) {
  return compact ? {
    'The Island': 'TI',
    'Scorched Earth': 'SE',
    'Abberation': 'AB',
    'Extinction': 'EX',
    'Genesis: Part 1': 'G1',
    'Genesis: Part 2': 'G2',
    'The Center': 'TC',
    'Ragnarok': 'RA',
    'Valguaro': 'VA',
    'Crystal Isles': 'CI',
    'Los Island': 'LI',
  }[server] : server;
}

function compactSex(sex) {
  return compact ? {
    'Male': 'M',
    'Female': 'F',
  }[sex] : sex;
}

function getLibraryList() {
  return 'No libraries found. Use "/stats add" to create a new one or "/stats help" for more information';
}

function getHelp() {
  return 'todo: say something useful here about /stats.';
}

/**
* Retrieves creature stats from the JSON database and returns
* them in the form of an AsciiTable3
* @param {String} name - The library name used to filter which creatures are returned
  @returns {AsciiTable3} A table of creature statistics.
*/
function getLibrary(name) {

  const statsTable = new AsciiTable3();
  statsTable.removeBorder();

  if (compact) {
    statsTable.setHeading('ID', 'Creature', 'Name', 'Map', 'Owner', 'Ge', 'HP', 'St', 'Ox', 'Fo', 'We', 'Dm', 'Sp');
  }
  else {
    statsTable.setHeading('ID', 'Creature', 'Name', 'Map', 'Owner', 'Sex', 'Health', 'Stamina', 'Oxygen', 'Food', 'Weight', 'Melee', 'Speed');
  }

  statsJson.Database.Libraries.forEach((library) => {
    if (library.Name == name) {
      let id = 0;
      library.Dinos.forEach(function(dino) {
        statsTable.addRow(
          ++id,
          dino.Creature,
          dino.Name,
          compactServer(dino.Server),
          dino.Owner,
          compactSex(dino.Sex),
          dino.Health,
          dino.Stamina,
          dino.Oxygen,
          dino.Food,
          dino.Weight,
          dino.Melee,
          dino.Speed);
      });
    }
  });

  return statsTable.rows.length > 0 ? statsTable : null;
}

/**
* Build a list of parameters for the creature select menu
* @param {AsciiTable3} statsTable - The table to derive the menu optiosn from
*/
function getMenuOptions(statsTable) {
  const menuOptions = [];
  // loop through the table, examine the first column with the creature name
  for (let index = 0; index < statsTable.rows.length; index++) {
    // Add the ID, Creature type and name to each option
    menuOptions.push({
      label: `${index + 1} ${statsTable.rows[index][1]} ${statsTable.rows[index][2]}`,
      value: `${index + 1}`,
      // set the first option as default
      default: index == 0 ? true : false,
    });
  }
  return menuOptions;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Loads the current creature stats.')
    .addStringOption(option =>
      option.setName('library')
        .setDescription('The stats library to accesss. Use "list" to see available libraries.')
        .setRequired(true)),
  async execute(interaction) {
    // Grab the libary name entered after the slash command
    const libraryName = interaction.options.getString('library');

    // Special case: if "list" is entered just print a list of libraries
    if (libraryName == 'list') {
      await interaction.reply({ content: `${getLibraryList()}` });
    }
    // Special case: if "help" is entered just print help info
    else if (libraryName == 'help') {
      await interaction.reply({ content: `${getHelp()}` });
    }
    // Otherwise attempt to retrieve the specified library by name
    else {
      const library = getLibrary(libraryName);

      // If the library was found setup the buttons
      if (library) {

        // Build the 1st button row after the table.
        const row1 = new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId('creatureMenu')
            .addOptions(getMenuOptions(library)),
        );

        // Build the 2nd button row after the table.
        const row2 = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('bumpHealth')
            .setStyle('Primary')
            .setEmoji('❤')
            .setLabel('Health'),
          new ButtonBuilder()
            .setCustomId('bumpStamina')
            .setStyle('Primary')
            .setEmoji('⚡')
            .setLabel('Stamina'),
          new ButtonBuilder()
            .setCustomId('bumpWeight')
            .setStyle('Primary')
            .setEmoji('🏋')
            .setLabel('Weight'),
          new ButtonBuilder()
            .setCustomId('bumpMelee')
            .setStyle('Primary')
            .setEmoji('💪')
            .setLabel('Melee'),
        );
        // Build the 3rd button row after the table.
        const row3 = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('add')
            .setStyle('Primary')
            .setEmoji('🦖')
            .setLabel('Add'),
          new ButtonBuilder()
            .setCustomId('edit')
            .setStyle('Primary')
            .setEmoji('📝')
            .setLabel('Edit'),
          new ButtonBuilder()
            .setCustomId('moveUp')
            .setStyle('Secondary')
            .setEmoji('⬆')
            .setLabel('Move'),
          new ButtonBuilder()
            .setCustomId('moveDown')
            .setStyle('Secondary')
            .setEmoji('⬇')
            .setLabel('Move'),
          new ButtonBuilder()
            .setCustomId('remove')
            .setStyle('Danger')
            .setEmoji('🗑')
            .setLabel('Remove'),
        );
        // Disaply the table and buttons
        await interaction.reply({
          content: 'Last updated: todo' + '\r\n\r\n' + '`' + library.toString() + '`' + '\r\nSelect a creature and use the stat buttons to "bump" a stat.\r\n',
          components: [row1, row2, row3],
        });
      }
      else {
        // Display a "library not found" message
        await interaction.reply({ content: `Could not find a libary named "${libraryName}". Use "/stats list" to see available libraries.` });
      }
    }
  },
};