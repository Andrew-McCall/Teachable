const {Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder} = require("discord.js");
const {TOKEN} = require("./config.json");

const client = new Client( {intents:[GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]} );

client.once("ready", ()=>{
    console.log("Ready!")
})

client.on("messageReactionAdd", (reaction, user) => {
    if (user.bot) return;

    const bot = ["🪨", "🧻", "✂️"][Math.floor(Math.random()*3)]
    
    if (reaction.emoji.name === bot){
        reaction.message.reply("You draw! The bot choose " + bot + ".")
    }else{
        switch (reaction.emoji.name){
            case "🪨":
                if (bot === "🧻"){
                    reaction.message.reply("The Bot choose Paper, and wins")
                }else{
                    reaction.message.reply("The Bot choose Scissors, You win")
                }
                break;
            case "🧻":
                if (bot === "✂️"){
                    reaction.message.reply("The Bot choose Scissors, and wins")
                }else{
                    reaction.message.reply("The Bot choose Rock, You win")
                }
                break;
            case "✂️":
                if (bot === "🪨"){
                    reaction.message.reply("The Bot choose Rock, and wins")
                }else{
                    reaction.message.reply("The Bot choose Paper, You win")
                }
                break;
            default:
                reaction.message.reply("Please use rock, paper or scissors only for your hand")
        }
    }

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

        } else if (msg[0] === "$rps2"){

            message.reply("Which hand would you like to play?\nPick: :rock: :roll_of_paper: :scissors:").then( sendMessage => {
                sendMessage.react("🪨") // Rock
                sendMessage.react("🧻") // Paper
                sendMessage.react("✂️") // Scissors
            })

        } else if (msg[0] === "$role"){

            message.reply({content:"Test", components:[new ActionRowBuilder().setComponents([new ButtonBuilder().setCustomId("red").setLabel("Red!").setStyle("Danger"),new ButtonBuilder().setCustomId("green").setLabel("Green!").setStyle("Success")])]})
            
            const collector = message.channel.createMessageComponentCollector({ filter:(i) => {return (i.user.id === message.author.id)}, time: 30000 });

            collector.on('collect', i => {
                i.deferUpdate();
                
                if (i.customId === "red"){
                    message.member.roles.add("1003406144116641952")
                    message.member.roles.remove("1003406058745761812")
                } else {
                    message.member.roles.add("1003406058745761812")
                    message.member.roles.remove("1003406144116641952")
                }
            });

        }
    }
    

})

client.login(TOKEN);