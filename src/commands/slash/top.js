const { SlashCommandBuilder } = require('@discordjs/builders');
const { AsciiTable3 } = require('ascii-table3');
// const { ClientInvalidOption } = require('discord.js/src/errors/ErrorCodes');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

// Load the stats database
const statsJson = require('../../data/stats.json');

// Mobile-friendly output
const compact = false;

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

function getHelp() {
  return 'Valid stat options are "health", "stamina", "Oxygen", "food", "weight", "melee" and "speed"';
}

/**
* Retrieves creature stats from the JSON database and returns
* the best stats for each found creature type in the form of an AsciiTable3
* @param {String} statName - The stat type you want to search for
  @returns {AsciiTable3} A table of creature statistics.
*/
function getTopStats(stat) {

  const statsTable = new AsciiTable3();
  statsTable.removeBorder();

  // a list of unique creature types
  const creatures = [];
  // a list of their associated best stat
  const topStats = [];

  if (compact) {
    statsTable.setHeading('ID', 'Library', 'Creature', 'Name', 'Map', 'Owner', 'Ge', 'HP', 'St', 'Ox', 'Fo', 'We', 'Dm', 'Sp');
  }
  else {
    statsTable.setHeading('ID', 'Library', 'Creature', 'Name', 'Map', 'Owner', 'Sex', 'Health', 'Stamina', 'Oxygen', 'Food', 'Weight', 'Melee', 'Speed');
  }

  statsJson.Database.Libraries.forEach((library) => {

    // Create a list of unique Creatures as we encounter them in the JSON database
    // If we encounter an existing one and it's stat is higher, save it for later
    library.Dinos.forEach(function(dino) {

      // search the unique creature type list
      const index = creatures.indexOf(dino.Creature);

      // if this is a new creature not found in our list it's the best by default so record it.
      if (index < 0) {
        creatures.push(dino.Creature);
        switch (stat) {
          case 'health':
            topStats.push(dino.Health);
            break;
          case 'stamina':
            topStats.push(dino.Stamina);
            break;
          case 'oxygen':
            topStats.push(dino.Oxygen);
            break;
          case 'food':
            topStats.push(dino.Food);
            break;
          case 'weight':
            topStats.push(dino.Weight);
            break;
          case 'melee':
            topStats.push(dino.Melee);
            break;
          case 'speed':
            topStats.push(dino.Speed);
            break;
          default:
            break;
        }
      }
      else {
        // this is a creature type we've seen before so compare the stat
        switch (stat) {
          case 'health':
            if (topStats[index] <= dino.Health) {
              topStats[index] = (dino.Health);
            }
            break;
          case 'stamina':
            if (topStats[index] <= dino.Stamina) {
              topStats[index] = (dino.Stamina);
            }
            break;
          case 'oxygen':
            if (topStats[index] <= dino.Oxygen) {
              topStats[index] = (dino.Oxygen);
            }
            break;
          case 'food':
            if (topStats[index] <= dino.Food) {
              topStats[index] = (dino.Food);
            }
            break;
          case 'weight':
            if (topStats[index] <= dino.Weight) {
              topStats[index] = (dino.Weight);
            }
            break;
          case 'melee':
            if (topStats[index] <= dino.Melee) {
              topStats[index] = (dino.Melee);
            }
            break;
          case 'speed':
            if (topStats[index] <= dino.Speed) {
              topStats[index] = (dino.Speed);
            }
            break;
          default:
            break;
        }
      }
    });
  });

  let id = 0;

  // loop through the JSON database again and this time, if the
  // dino is the "best" for the given stat add it to the table
  statsJson.Database.Libraries.forEach((library) => {

    library.Dinos.forEach(function(dino) {

      // search the unique creature type list
      const index = creatures.indexOf(dino.Creature);

      // the creature should be found or something has gone really wrong
      if (index < 0) return;
      // todo throw error

      let best = false;
      switch (stat) {
        case 'health':
          if (topStats[index] <= dino.Health) {
            best = true;
          }
          break;
        case 'stamina':
          if (topStats[index] <= dino.Stamina) {
            best = true;
          }
          break;
        case 'oxygen':
          if (topStats[index] <= dino.Oxygen) {
            best = true;
          }
          break;
        case 'food':
          if (topStats[index] <= dino.Food) {
            best = true;
          }
          break;
        case 'weight':
          if (topStats[index] <= dino.Weight) {
            best = true;
          }
          break;
        case 'melee':
          if (topStats[index] <= dino.Melee) {
            best = true;
          }
          break;
        case 'speed':
          if (topStats[index] <= dino.Speed) {
            best = true;
          }
          break;
        default:
          break;
      }

      // if this is a "best" dino based on stat add it to the table
      if (best) {
        statsTable.addRow(
          ++id,
          library.Name,
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
      }
    });
  });

  return statsTable.rows.length > 0 ? statsTable : null;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('top')
    .setDescription('Finds the best stats across all libraries')
    .addStringOption(option =>
      option.setName('stat')
        .setDescription('The stats to search for. Use "help" to see valid options.')
        .setRequired(true)),
  async execute(interaction) {
    // Grab the libary name entered after the slash command
    const statName = interaction.options.getString('stat');

    // Special case: if "help" is entered just print help info
    if (statName == 'help') {
      await interaction.reply({ content: `${getHelp()}` });
    }
    // Otherwise attempt to retrieve the best dinos from across all libraries
    else {
      const topCreatures = getTopStats(statName);
      // Disaply the results
      if (topCreatures) {

        // Build the 2nd button row after the table.
        const row1 = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('Health')
            .setStyle('Primary')
            .setEmoji('❤')
            .setLabel('Health'),
          new ButtonBuilder()
            .setCustomId('Stamina')
            .setStyle('Primary')
            .setEmoji('⚡')
            .setLabel('Stamina'),
          new ButtonBuilder()
            .setCustomId('Weight')
            .setStyle('Primary')
            .setEmoji('🏋')
            .setLabel('Weight'),
          new ButtonBuilder()
            .setCustomId('Melee')
            .setStyle('Primary')
            .setEmoji('💪')
            .setLabel('Melee'),
        );


        await interaction.reply({ content: 'Last updated: todo' + '\r\n\r\n' + '`' + topCreatures.toString() + '`' + '\r\nUse the buttons below to find the best stats.\r\n', components: [row1] });
      }
      else {
        await interaction.reply({ content: 'Error: could not find any creatures.' });
      }
    }
  },
};