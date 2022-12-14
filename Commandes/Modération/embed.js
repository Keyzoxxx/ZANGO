const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "embed",
    description: "Permet de créer une suggestion",
    utilisation: "(suggestion)",
    alias: ["embed"],
    permission: "",
    category: "Divers",

    async run(bot, message, args) {
      if(!args[0]) {
        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`<:error:1008597496785805353> Veuillez inclure un message !`)

        return message.reply({embeds: [Embed]})
      }

      let EmbedSondage = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle(`${message.author.username}`)
      .setDescription(args.slice(0).join(" "))
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
      
      message.channel.send({embeds: [EmbedSondage]})
      message.delete()
    }
})