import {ActionRowBuilder, ButtonBuilder} from require("discord.js")

const execute = (message)=>{
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

module.exports = {execute, name:"$role"}