const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "clearchannel",
    description: "Permet de supprimer tous les messages d'un salon",
    utilisation: "",
    alias: ["clearchannel", "clearsalon", "clearall"],
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    category: "Modération",

    async run(bot, message, args) {

      let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Impossible de clear ce salon !`)

      if(!message.channel.deletable) return message.reply({embeds: [Embed1]})
          message.channel.clone().then((ch) => {
              let Embed2 = new Discord.MessageEmbed()
              .setColor(bot.color)
              .setDescription("<:success:1008597626154926141> <@" + message.author.id + ">, Salon recréé !")

              ch.setParent(message.channel.parent);
              ch.setPosition(message.channel.position);
              message.channel.delete();
              ch.send({embeds: [Embed2]}).then(msg => {
                  setTimeout(() => {
                      msg.delete();
                  }, 3000)
              })
          })
     }
})