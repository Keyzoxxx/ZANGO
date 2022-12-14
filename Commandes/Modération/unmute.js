const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const { ChannelLogsUnmute } = require("../../config");

module.exports = new Command({

    name: "unmute",
    description: "Permet de rendre la parole d'un utilisateur",
    utilisation: "[membre]  (raison)",
    alias: ["unmute"],
    permission: Discord.Permissions.FLAGS.MODERATE_MEMBERS,
    category: "Modération",

    async run(bot, message, args) {

      let Embed1 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Aucune personne trouvée !`)

      let Embed2 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas vous rendre votre propre parole !`)

      let Embed3 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas rendre la parole de cette personne !`)

      let Embed4 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Vous ne pouvez pas rendre la parole de cette personne !`)

      let Embed5 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Cette personne a déjà sa parole !`)
      
      let user = message.user ? bot.users.cache.get(args._hoistedOptions[0].value) : (message.mentions.users.first() || bot.users.cache.get(args[0].value));
      if(!user) return message.reply({embeds: [Embed1]})

      let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ")
      if(!reason) reason = "Aucune raison donnée";

      if(message.user === undefined ? (user.id === message.author.id) : (user.id === message.user.id)) return message.reply({embeds: [Embed2]})
      if(user.id === message.guild.ownerId) return message.reply({embeds: [Embed3]})
      if(message.member.roles.highest.comparePositionTo(message.guild.members.cache.get(user.id).roles.highest) <= 0) return message.reply({embeds: [Embed4]})
      if(!message.guild.members.cache.get(user.id).isCommunicationDisabled()) return message.reply({embeds: [Embed5]})

      try {
        let Embed6 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("Parole")
        .setDescription(`Vous avez de nouveau la parole sur le serveur \`${message.guild.name}\` grâce à \`${message.user === undefined ? message.author.tag : message.user.tag}\`.\n\n**Raison :** ${reason}.`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

        
        await user.send({embeds: [Embed6]})
      } catch (err) {}

      let Embed7 = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("Parole")
      .setDescription(`\`${user.tag}\` a de nouveau la parole grâce à \`${message.user === undefined ? message.author.tag : message.user.tag}\`.\n\n**Raison :** ${reason}.`)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))

      await message.reply({embeds: [Embed7]})

      message.guild.members.cache.get(user.id).timeout(null, `${reason} (Parole rendu par ${message.user === undefined ? message.author.tag : message.user.tag})`)

      let ChannelLogsUnmutes = bot.channels.cache.get(ChannelLogsUnmute)

      let EmbedUnmute = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle("Parole")
      .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/speaker-high-volume_1f50a.png')
      .setDescription(`<:Members:1008831302293803108> **Utilisateur :** ${user}\n<:Staff:1008831321608568905> **Modérateur :** ${message.user ? message.user : message.author}\n<:Ping:1008831313425477662> **Date :** <t:${Math.floor(message.createdAt / 1000)}:F>\n<:Reason:1010677273604669502> **Raison :** ${reason}.`)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
      ChannelLogsUnmutes.send({embeds: [EmbedUnmute]})  
    }
})