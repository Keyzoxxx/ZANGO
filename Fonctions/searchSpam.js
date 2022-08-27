const Discord = require("discord.js");
const ChannelLogsKick = require("../config");
const UserMap = new Map();

module.exports = async (message, bot, args, db) => {

    if(message.channel.id === "") return;
    if(message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) return;

    if(UserMap.get(message.author.id)) {

        const UserData = UserMap.get(message.author.id)
        const { lastMessage, timer } = UserData
        let difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = UserData.msgCount;

        if(difference > 20000) {

            clearTimeout(timer);
            UserData.msgCount = 0;
            UserData.lastMessage = message;

            UserData.timer = setTimeout(() => {

                UserMap.delete(message.author.id)

            }, 360000)

            UserMap.set(message.author.id, UserData)
        
        } else {

            msgCount++;
            
            if(msgCount >= 5) {

              let Embed = new Discord.MessageEmbed()
              .setColor('#00feff')
              .setDescription(`<:Warning:1009178369973305444> Attention ${message.author}, vous envoyez trop de messages en peu de temps !`)  
              
              await message.channel.send({embeds: [Embed]})
        } 
        UserData.msgCount = 5;
        if(msgCount >= 10) {
            try {
                await message.guild.members.cache.get(message.author.id).kick(`Spam alors qu'il a été averti`)
            } catch (err) { }
            try {
                await message.channel.bulkDelete(25)
            } catch (err) {}
                let Embed1 = new Discord.MessageEmbed()
                .setColor('#00feff')
                .setDescription(`⚠️ ${message.author} vient d'être expulsé par l'auto mode (anti-spam)`)  
                message.channel.send({embeds: [Embed1]})
        } 
        else {
            
            UserData.msgCount = msgCount
            UserMap.set(message.author.id, UserData)
            }
        }

    } else {

        let fn = setTimeout(async () => {

            UserMap.delete(message.author.id)
        }, 360000)

        UserMap.set(message.author.id, {

            msgCount: 0,
            lastMessage: message,
            timer: fn
        })
    }
}