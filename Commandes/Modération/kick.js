const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const { ChannelLogsKick } = require("../../config");

module.exports = new Command({

  name: "kick",
  description: "Permet d'expulser un utilisateur",
  utilisation: "[membre] (raison)",
  alias: ["kick"],
  permission: Discord.Permissions.FLAGS.KICK_MEMBERS,
  category: "Modération",

  async run(bot, message, args) {

    let Embed1 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Aucune personne trouvée !`)

    let Embed2 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas vous expulser vous-même !`)

    let Embed3 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas expulser cette personne !`)

    let Embed4 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas expulser cette personne !`)
    
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
      .setTitle("Expulsion")
      .setDescription(`Vous avez été expulsé du serveur \`${message.guild.name}\` par \`${message.user === undefined ? message.author.tag : message.user.tag}\`.\n\n**Raison :** ${reason}.`)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

      await user.send({embeds: [Embed5]})
    } catch (err) {}

    let Embed6 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Expulsion")
    .setDescription(`\`${user.tag}\` a été expulsé par \`${message.user === undefined ? message.author.tag : message.user.tag}\`.\n\n**Raison :** ${reason}.`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
    
    await message.reply({embeds: [Embed6]})
   
    await message.guild.members.cache.get(user.id).kick(`${reason}`)

    if(reason.includes("'")) reason = reason.replace(/'/g, "\\'")
    
    let ChannelLogsKicks = bot.channels.cache.get(ChannelLogsKick)

    let EmbedKick = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Expulsion")
    .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/no-entry_26d4.png')
    .setDescription(`<:Members:1008831302293803108> **Utilisateur :** ${user}\n<:Staff:1008831321608568905> **Modérateur :** ${message.user ? message.user : message.author}\n<:Ping:1008831313425477662> **Date :** <t:${Math.floor(message.createdAt / 1000)}:F>\n<:Reason:1010677273604669502> **Raison :** ${reason}.`)
    .setTimestamp()
    .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

    ChannelLogsKicks.send({embeds: [EmbedKick]}) 
  }
})