const Discord = require("discord.js");
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "8ball",
  description: "Permet de poser une question au bot",
  utilisation: "",
  alias: ["8ball"],
  permission: "",
  category: "Fun",

  async run(bot, message, args) {
    const replies = [
      "Oui",
      "Oui, c'est sûr !",
      "C'est sûr",
      "C'est sûr que non !",
      "Je crois",
      "Je pense que oui",
      "Hmmmm je ne sais pas...",
      "Non !", "Je ne pense pas",
      "Je pense que non",
      "Non, c'est sûr !",
      "Une chance sur deux",
      "Oui, absolument !",
      "Non, absolument pas",
      "Très probable",
      "C'est non !",
      "Sans aucun doute",
      "Repose ta question",
      "C'est certain",
      "Ça dépend",
      "T'as dit quoi ?",
      "Je m'en fou",
    ];
    
    let response = Math.floor(Math.random() * 20);
    if(!args[0]) {
      let Embed = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Veuillez indiquer une question !`)

      return message.reply({embeds: [Embed]})
    }
    
    let Embed8ball = new Discord.MessageEmbed()
    .setColor(bot.color)
    .addFields(
      {name: "❔ **Question :**", value: args.slice(0).join(" ")},
      {name: "❗ **Réponse à la question :**",value: `${replies[response]}`}
    )

    message.channel.send({content: `${message.author}`,embeds: [Embed8ball]})
    message.delete()
  }
})