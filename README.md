# SquidBot
A Discord bot for the game ARK: Survival Evolved

# NOTE: These install packages listed below should be imported automatically by package.json
# I've them below to record what I did to set the project up from scratch
# TODO The discord installs might be redundant?

# Install ESLint package (syntax/error checking)
npm install --save-dev eslint
# https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

# initialize the node project directory
npm init

# Install the discord api
npm install discord.js

# Install libraries for command handling
npm install @discordjs/builders @discordjs/rest discord-api-types

# Install utilitiy method to build slash commands
npm install @discordjs/builders

# install utility to print ASCII tables
npm install ascii-table3

# Perms
# Read Messages
# Send Messages
# Use Application Commands
# https://discord.com/api/oauth2/authorize?client_id=909659103377367070&permissions=2147486720&scope=bot%20applications.commands