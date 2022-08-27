const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const { prefix } = require("../../config")

module.exports = new Event("messageCreate", async (bot, message) => {

    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let commandArray = message.content.slice(" ")
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandFalse = commandArray.slice(" ");
  
    let commandFile = bot.alias.get(command.slice(prefix.length))
    
    await bot.function.searchLinks(message)
    await bot.function.searchMentions(message)
    await bot.function.searchSpam(message)
  
    let Embed4 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> La commande \`` + commandFalse  + `\` n'existe pas !`)

    if(!message.content.startsWith(prefix)) return;
    if(!commandFile) return message.reply({embeds: [Embed4]})

    let Embed5 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous n'avez pas la permission requise pour exécuter la commande \`${command}\` !`)

    let Embed6 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous n'avez pas la permission requise pour exécuter la commande \`${command}\` !`)

    if(commandFile.permission === "Développeur" && message.author.id !== "940232076626640897") return message.reply({embeds: [Embed5]})
    if(commandFile.permission !== "Aucune" && commandFile.permission !== "Développeur" && !message.member.permissions.has(new Discord.Permissions(commandFile.permission))) return message.reply({embeds: [Embed6]})
  
    commandFile.run(bot, message, args)
})