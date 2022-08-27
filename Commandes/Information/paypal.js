const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "paypal",
  description: "Permet de connaître le paypal de Keyzox",
  utilisation: "",
  alias: ["paypal"],
  permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
  category: "Information",

  async run(bot, message, args, db) {

    let EmbedPaypal = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle('PayPal')
    .setDescription(`Si vous souhaitez me faire un don, acheter une/plusieurs commande(s) ou acheter le bot, voici mon PayPal.`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
    var ButtonPayPal = new Discord.MessageActionRow()
    .addComponents(new Discord.MessageButton()
    .setStyle('LINK')
    .setLabel('PayPal')
    .setURL('https://www.paypal.me/bigsunv3?locale.x=fr_FR')
    );

    await message.reply({embeds: [EmbedPaypal], components: [ButtonPayPal]})
  }
})