const chalk = require('chalk');

module.export = {
  name: 'err',
  execute(err) {
    console.log(
      chalk.red(`[Database]: An error has occured with the database connection:\n${err}`));
  },
};