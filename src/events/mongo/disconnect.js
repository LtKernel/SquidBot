const chalk = require("chalk");

module.exports = {
  name: "disconnected",
  async execute() {
    console.log(chalk.yellow("[Database]: Disconnected."));
  },
};