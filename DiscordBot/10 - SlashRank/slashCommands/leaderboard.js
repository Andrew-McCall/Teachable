const { SlashCommandBuilder } = require("discord.js");
const userDataModel = require("../services/mongodb")

const data = new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("View the leaderboard")

const execute = (interaction) => {

    userDataModel.find().sort({points:-1}).limit(10).then(res => {
    
       let outputString = ""
       res.forEach(user => {
            outputString += `\n<@${user.userId}> - ${user.points}`
       })

       interaction.reply({embeds:[
        {
        title:"Leaderboard!",
        description:outputString
        }
    ]})

    }).catch(err=>{
        console.log(err)
        interaction.reply("There was an error.")
    })

}

module.exports = {execute, name:data.name, data}