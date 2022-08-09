const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9")
const {TOKEN} = require("../config.json")

const rest = new REST({version:"9"}).setToken(TOKEN);

const execute = (message) => {

    
    const commands = []

    global.slashCommands.forEach(slash => {
        commands.push(slash.data.toJSON())
    });


    message.reply("Started Refreshing Commands").then(m => {

        rest.put(

            Routes.applicationCommands(global.client.user.id),
            { body: commands },

        ).then(()=>{
            m.edit("Finished Refreshing Commands")
        }).catch((err)=>{
            console.log(err)
            m.edit("There was an error.")
        })

    })


}

module.exports = {execute, name:"$update"}