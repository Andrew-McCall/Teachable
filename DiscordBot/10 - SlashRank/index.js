const {Client, GatewayIntentBits, Collection} = require("discord.js");
const fs = require("fs")
const {TOKEN} = require("./config.json");
const {connect} = require("mongoose")

global.client = new Client( {intents:[GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]} );

// Functions
function readComponents(folder){
    const components = new Collection()
    const files = fs.readdirSync(`./${folder}/`).filter(f => f.endsWith(".js"))
    for (const file of files){
        const command = require(`./${folder}/${file}`);
        if (command.name){
            components.set(command.name, command);
        }
    }
    return components;
}

// Setup
global.messageCommands = readComponents("messageCommands");
global.slashCommands = readComponents("slashCommands");

connect("mongodb://127.0.0.1:27017/teachable").then(()=>{
    console.log("database connected!")
}).catch(err =>{
    console.log(err);
})

// Bot Logic
global.client.once("ready", ()=>{
    console.log("Ready!")
})

global.client.on("messageReactionAdd", (reaction, user) => {
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

global.client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("$")){

        const words = message.content.toLowerCase().split(" ")
        if (global.messageCommands.has(words[0])){

            try{

                global.messageCommands.get(words[0]).execute(message, words);

            }catch(err){

                console.log(err)
                message.reply("There was an error");

            }

        }
    
    }
})

global.client.on("interactionCreate", (i) => {


    if (global.slashCommands.has(i.commandName)){

        try{

            global.slashCommands.get(i.commandName).execute(i)

        }catch(err){

                console.log(err)
                message.reply("There was an error");

            }
    

    }

})
global.client.login(TOKEN);