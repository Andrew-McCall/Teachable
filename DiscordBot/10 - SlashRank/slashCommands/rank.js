const { SlashCommandBuilder } = require("discord.js");
const userDataModel = require("../services/mongodb")

const data = new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Check your rank")

const execute = (interaction) => {

    userDataModel.findOne({userId:interaction.user.id}).then(res => {
    
        if (res){
            
            interaction.reply({embeds:[{
                title:interaction.member.displayName,
                description:JSON.stringify(res)
            }]})

        }else{

            userDataModel.create({userId:interaction.user.id, points:10}).then( newRes =>{
                interaction.reply({embeds:[{
                    title:interaction.member.displayName,
                    description:JSON.stringify(res)
                }]})
            })
            
        }



    }).catch(err=>{
        console.log(err)
        interaction.reply("There was an error.")
    })

}

module.exports = {execute, name:data.name, data}