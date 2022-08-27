const Discord = require("discord.js")
const Command = require("../../Structure/Command")
const { ChannelLogsUnlock } = require("../../config");

module.exports = new Command({

    name: "unlock",
    description: "Permet de débloquer un salon",
    utilisation: "[channel] (reason)",
    alias: ["unlock"],
    permission: Discord.Permissions.FLAGS.MANAGE_CHANNELS,
    category: "Modération",

    async run(bot, message, args) {

        let Embed1 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`<:error:1008597496785805353> Aucun salon trouvé !`)

        let Embed2 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`<:error:1008597496785805353> Ce salon est déjà débloqué !`)
        
        let channel = message.user ? message.guild.channels.cache.get(args._hoistedOptions[0].value) : (message.mentions.channels.first() || message.guild.channels.cache.get(args[0]))
        if(!channel) return message.reply({embeds: [Embed1]})

        let reason = message.user ? args._hoistedOptions.length > 1 ? args._hoistedOptions[1].value : undefined : args.slice(1).join(" ");
        if(!reason) reason = "Aucune raison donnée";

        if(channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id)?.allow.toArray(false).includes("SEND_MESSAGES")) return message.reply({embeds: [Embed2]})

        await channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {
            SEND_MESSAGES: true
        })

        let Embed3 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setDescription(`<:success:1008597626154926141> Le salon a été débloqué avec succès !`)
        
        let Embed4 = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Débloquement')
        .setDescription(`Ce salon a été débloqué par \`${message.user ? message.user : message.author}\`.\n**Raison :** ${reason}.`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        
        await message.reply({embeds: [Embed3]})
        await channel.send({embeds: [Embed4]})

        let ChannelLogsUnlocks = bot.channels.cache.get(ChannelLogsUnlock)

        let EmbedUnlock = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle("Débloquement")
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/unlocked_1f513.png')
        .setDescription(`<:Channel:1008852662504149052> **Salon :** ${channel}\n<:Staff:1008831321608568905> **Modérateur :** ${message.user ? message.user : message.author}\n<:Ping:1008831313425477662> **Date :** <t:${Math.floor(message.createdAt / 1000)}:F>\n<:Reason:1010677273604669502> **Raison :** ${reason}.`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
    
        ChannelLogsUnlocks.send({embeds: [EmbedUnlock]})  
    }
})