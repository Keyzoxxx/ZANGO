const Discord = require("discord.js");
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "howgay",
  description: "Permet de savoir votre pourcentage de gaytitude",
  utilisation: "",
  alias: ["howgay"],
  permission: "",
  category: "Divers",

  async run(bot, message, args) {

    function random(min, max){
      return Math.round(Math.random() * (max - min))
    }
   
    let EmbedGaytitude = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle('Test de Gaytitude')
    .setThumbnail('https://monstickerdeco.fr/modules/stickerproduct/data/sticker/548/1579599829_113065267.png')
    .setDescription(`\`${message.author.tag}\` est gay à ` + random(0, 100) + `%`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

    message.reply({embeds: [EmbedGaytitude]})
  }
})