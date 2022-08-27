const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "channeldelete",
    description: "Permet de supprimer tous les messages d'un salon",
    utilisation: "",
    alias: ["channeldelete"],
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    category: "Modération",

    async run(bot, message, args) {

        let Embed1 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`<:error:1008597496785805353> Impossible de supprimé ce salon !`)

        if(!message.channel.deletable) return message.reply({embeds: [Embed1]})

        message.channel.delete()
     }
})