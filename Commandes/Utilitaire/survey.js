const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "survey",
    description: "Permet de créer un sondage",
    utilisation: "(sondage)",
    alias: ["survey", "sondage"],
    permission: "",
    category: "Divers",

    async run(bot, message, args) {
      if(!args[0]) {
        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`<:error:1008597496785805353> Veuillez inclure votre sondage !`)

        return message.reply({embeds: [Embed]})
      }

      let EmbedSondage = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle(`Nouveau sondage de ${message.author.tag}`)
      .setDescription(args.slice(0).join(" "))
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
      
      message.channel.send({embeds: [EmbedSondage]}).then(function(message) {
        message.react('<:success:1008597626154926141>')
        message.react('<:error:1008597496785805353>')
      })
      message.delete()
    }
})