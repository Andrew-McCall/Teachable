const execute = (message) => {
    message.reply("Which hand would you like to play?\nPick: :rock: :roll_of_paper: :scissors:").then( sendMessage => {
        sendMessage.react("🪨") // Rock
        sendMessage.react("🧻") // Paper
        sendMessage.react("✂️") // Scissors
    })
}

module.exports = {execute, name:"$rps2"}