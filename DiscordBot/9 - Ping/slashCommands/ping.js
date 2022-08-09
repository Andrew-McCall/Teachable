const { SlashCommandBuilder } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Checks that the bot is online")

const execute = (interaction) => {

    interaction.reply("Pong! 2 You!");

}

module.exports = {execute, name:data.name, data}