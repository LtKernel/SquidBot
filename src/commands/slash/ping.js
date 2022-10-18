const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Returns my ping."),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            featchReply: true,
        });
        // todo: investigate issue with using message.createdTimestamp
        const newMessage = `\r\nAPI Latency: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;
        await interaction.editReply({
            content: newMessage,
        });
    },
};