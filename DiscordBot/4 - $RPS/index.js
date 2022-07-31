const {Client, GatewayIntentBits} = require("discord.js");
const {TOKEN} = require("./config.json");

const client = new Client( {intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]} );

client.once("ready", ()=>{
    console.log("Ready!")
})

client.on("messageCreate", (message) => {

    
    if (message.content.startsWith("$")){

        const msg = message.content.toLowerCase().split(" ")

        if (msg[0] === "$ping"){
            message.reply("Pong!")
        } else if (msg[0] === "$8ball"){
            message.reply(["Yes", "No", "Maybe"][Math.floor(Math.random()*3)])
        } else if (msg[0] === "$rps"){
            
            if (msg.length === 2){
                const bot = ["rock", "paper", "scissors"][Math.floor(Math.random()*3)]
                if (bot.startsWith(msg[1])){
                    message.reply("You draw! The bot choose " + bot + ".")
                }else{
                    switch (msg[1]){
                        case "r":
                        case "rock":
                            if (bot === "paper"){
                                message.reply("The Bot choose Paper, and wins")
                            }else{
                                message.reply("The Bot choose Scissors, You win")
                            }
                            break;
                        case "p":
                        case "paper":
                            if (bot === "scissors"){
                                message.reply("The Bot choose Scissors, and wins")
                            }else{
                                message.reply("The Bot choose Rock, You win")
                            }
                            break;
                        case "s":
                        case "scissors":
                            if (bot === "rock"){
                                message.reply("The Bot choose Rock, and wins")
                            }else{
                                message.reply("The Bot choose Paper, You win")
                            }
                            break;
                        default:
                            message.reply("Please use rock, paper or scissors only for your hand")
                    }
                }
            }else{
                message.reply("Please use '$rps [Hand]' e.g '$rps rock'")
            }

        }
    }
    

})

client.login(TOKEN);