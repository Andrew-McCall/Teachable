const userDataModel = require("../services/mongodb")

const execute = (message) => {

    userDataModel.findOne({userId:message.author.id}).then(res => {
        if (res){
            res.points+=3;
            res.save().then((updatedRes) => {
                message.reply(JSON.stringify(updatedRes))
            })
        }else{
            userDataModel.create({
                userId:message.author.id,
                points:10
            }).then( (newRes)=> {
                message.reply(JSON.stringify(newRes))
            })
        }
    }).catch(err => {
        console.log(err)
        message.reply("There was an error.")
    })

}

module.exports = {execute, name:"$points"}