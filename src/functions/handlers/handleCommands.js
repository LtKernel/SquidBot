const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const chalk = require("chalk");
const { clientId, guildId, token } = require("../../../config.json");

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        client.commandArray.push(command.data.toJSON());
        console.log(`[Commands]: Finished processing command "/${command.data.name}".`);
      }
    }
    // Note: To make the commands global across Discord, use applicationCommands
    // without the guildID parameter. However it might take an hour to propagate
    const rest = new REST({ version: "9" }).setToken(token);
    console.log("[Commands]: Registering commands with Discord.");
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: client.commandArray })
      .then(() => console.log(chalk.green("[Commands]: Successfully registered commands.")))
      .catch(console.error);
  };
};
