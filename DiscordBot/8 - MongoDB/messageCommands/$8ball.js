const execute = (message) => {

    message.reply(["Yes", "No", "Maybe"][Math.floor(Math.random()*3)])

}

module.exports = {execute, name:"$8ball"}