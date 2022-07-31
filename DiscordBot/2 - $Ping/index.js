const {Client, GatewayIntentBits} = require("discord.js");
const {TOKEN} = require("./config.json");

const client = new Client( {intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]} );

client.once("ready", ()=>{
    console.log("Ready!")
})

client.on("messageCreate", (message) => {

    if (message.content.toLowerCase() === "$ping"){
        message.reply("Pong!")
    }


})

client.login(TOKEN);