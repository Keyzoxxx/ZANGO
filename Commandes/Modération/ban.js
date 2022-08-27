const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const { ChannelLogsBan } = require("../../config");

module.exports = new Command({

  name: "ban",
  description: "Permet de bannir définitivement un utilisateur",
  utilisation: "[membre] (raison)",
  alias: ["ban"],
  permission: Discord.Permissions.FLAGS.BAN_MEMBERS,
  category: "Modération",

  async run(bot, message, args) {

    let Embed1 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Aucune personne trouvée !`)

    let Embed2 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas vous bannir vous-même !`)

    let Embed3 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas bannir cette personne !`)

    let Embed4 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas bannir cette personne !`)
    
    let user = message.user === undefined ? (message.mentions.users.first() || bot.users.cache.get(args[0])) : bot.users.cache.get(args._hoistedOptions[0].value)
    if(!user) return message.reply({embeds: [Embed1]})

    let reason = message.user ? (args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined) : args.slice(1).join(" ");
    if(!reason) reason = "Aucune raison donnée";

    if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({embeds: [Embed2]})
    if(user.id === message.guild.ownerId) return message.reply({embeds: [Embed3]})
    if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({embeds: [Embed4]})

    try {
      let Embed5 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("Bannissement")
      .setDescription(`Vous avez été banni du serveur \`${message.guild.name}\` par \`${message.user === undefined ? message.author.tag : message.user.tag}\`.\n\n**Raison :** ${reason}.`)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

      
      await user.send({embeds: [Embed5]})
    } catch (err) {}
    
    let Embed6 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Bannissement")
    .setDescription(`\`${user.tag}\` a été banni par \`${message.user === undefined ? message.author.tag : message.user.tag}\`.\n\n**Raison :** ${reason}.`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

    await message.reply({embeds: [Embed6]})

    await message.guild.members.cache.get(user.id).ban({reason: `${reason}`})

    if(reason.includes("'")) reason = reason.replace(/'/g, "\\'")
    
    let ChannelLogsBans = bot.channels.cache.get(ChannelLogsBan)

    let EmbedBan = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Bannissement")
    .setThumbnail('https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F729737792480870431.png%3Fv%3D1&w=64&q=75')
    .setDescription(`<:Members:1008831302293803108> **Utilisateur :** ${user}\n<:Staff:1008831321608568905> **Modérateur :** ${message.user ? message.user : message.author}\n<:Ping:1008831313425477662> **Date :** <t:${Math.floor(message.createdAt / 1000)}:F>\n<:Reason:1010677273604669502> **Raison :** ${reason}.`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

    ChannelLogsBans.send({embeds: [EmbedBan]}) 
  }
})