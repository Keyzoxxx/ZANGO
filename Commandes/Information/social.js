const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "social",
  description: "Permet de connaître les réseaux sociaux de Keyzox",
  utilisation: "",
  alias: ["paypal"],
  permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
  category: "Information",

  async run(bot, message, args, db) {

    let EmbedPaypal = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle('Social')
    .setDescription(`Pour me soutenir, venez me suivre sur mes réseaux !`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
    var ButtonPayPal = new Discord.MessageActionRow()
    .addComponents(new Discord.MessageButton()
    .setStyle('LINK')
    .setEmoji('<:Link:1008831299835932752>')
    .setLabel('Twitch')
    .setURL('https://www.twitch.tv/bigsunv3'),
    new Discord.MessageButton()
    .setStyle('LINK')
    .setEmoji('<:Link:1008831299835932752>')
    .setLabel('YouTube')
    .setURL('https://www.youtube.com/channel/UCbuQd2MPfZYjhdiyki3ujmw'),
    new Discord.MessageButton()
    .setStyle('LINK')
    .setEmoji('<:Link:1008831299835932752>')
    .setLabel('Instagram')
    .setURL('https://www.instagram.com/twitch_zeyrox/')
    );

    await message.reply({embeds: [EmbedPaypal], components: [ButtonPayPal]})
  }
})