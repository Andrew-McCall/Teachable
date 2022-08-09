const execute = (message, words) => {

    if (words.length === 2){
        const bot = ["rock", "paper", "scissors"][Math.floor(Math.random()*3)]
        if (bot.startsWith(words[1])){
            message.reply("You draw! The bot choose " + bot + ".")
        }else{
            switch (words[1]){
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


module.exports = {execute, name:"$8ball"}