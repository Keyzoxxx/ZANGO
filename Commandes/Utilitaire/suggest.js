const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "suggest",
    description: "Permet de créer une suggestion",
    utilisation: "(suggestion)",
    alias: ["suggest", "suggestion", "sugg"],
    permission: "",
    category: "Divers",

    async run(bot, message, args) {
      if(!args[0]) {
        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`<:error:1008597496785805353> Veuillez inclure une suggestion !`)

        return message.reply({embeds: [Embed]})
      }

      let EmbedSondage = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle(`Nouvelle suggestion de ${message.author.tag}`)
      .setDescription(args.slice(0).join(" "))
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
      
      message.channel.send({embeds: [EmbedSondage]}).then(function(message) {
        message.react('<:success:1008597626154926141>')
        message.react('<:error:1008597496785805353>')
        message.react('🤔')
      })
      message.delete()
    }
})