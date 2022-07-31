const {Client, GatewayIntentBits} = require("discord.js");
const {TOKEN} = require("./config.json");

const client = new Client( {intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]} );

client.once("ready", ()=>{
    console.log("Ready!")
})

client.on("messageCreate", (message) => {

    
    if (message.content.startsWith("$")){

        const msg = message.content.toLowerCase()

        if (msg === "$ping"){
            message.reply("Pong!")
        } else if (msg === "$8ball"){
            message.reply(["Yes", "No", "Maybe"][Math.floor(Math.random()*3)])
        }
        
    }
    

})

client.login(TOKEN);