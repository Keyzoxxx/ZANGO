const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "serverinfo",
    description: "Permet d'avoir des informations sur le serveur",
    utilisation: "",
    alias: ["serverinfo", "si"],
    permission: "Aucune",
    category: "Information",

    async run(bot, message, args) {

        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Informations sur le serveur ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addField("Informations sur le serveur :", `> <:Crown:1008831290524569751> **Nom :** \`${message.guild.name}\`\n> <:Owner:1008831330294972549> **Propriétaire :** ${(await message.guild.fetchOwner())}\n> <:Identifiant:1008869989979263120> **Identifiant :** \`${message.guild.id}\`\n> <:Chat:1008831288817500394> **Description :** ${message.guild.description ? message.guild.description : "\`Aucune\`"}\n> <:Link:1008831299835932752> **URL de l'avatar :** [Avatar](${bot.user.displayAvatarURL({dynamic: true})})\n> <:Booster:1008831328034238504> **Boost :** \`${message.guild.premiumSubscriptionCount} (${message.guild.premiumTier})\`\n> <:Invite:1008831294559506452> **Date de création :** <t:${Math.floor(message.guild.createdAt / 1000)}:F>`)
        .addField("Informations sur les stats :", `> <:Channel:1008852662504149052> **Salons :** \`${message.guild.channels.cache.size}\`\n> <:Roles:1008852577791778827> **Rôles :** \`${message.guild.roles.cache.size}\`\n> <:Emoji:1008891433589149830> **Emojis :** \`${message.guild.emojis.cache.size}\`\n> <:Members:1008831302293803108> **Membres :** \`${message.guild.members.cache.size}\``)
        .addField("Informations sur les salons spéciaux :", `> <:Rules:1008831315845582948> **Règlement :** ${message.guild.rulesChannel ? message.guild.rulesChannel : "\`Aucun\`"}\n> <:Muted:1008831306232246322> **AFK** : ${message.guild.afkChannel ? message.guild.afkChannel : "\`Aucun\`"}`)
        .setImage(message.guild.bannerURL({ dynamic: true, size: 4096 }))
        .setTimestamp()
        .setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

        await message.reply({ embeds: [Embed] })
    }
})