const chalk = require("chalk");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(chalk.blue(`[Bot]: ${client.user.tag} is logged in.`));
        console.log(chalk.blue("[Bot]: SquidBot is online. All systems nominal. Weapons hot. Mission: the destruction of any and all Chinese communists."));
    },
};