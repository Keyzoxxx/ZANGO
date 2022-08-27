const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "botinfo",
    description: "Permet d'avoir des informations sur le bot",
    utilisation: "",
    alias: ["botinfo"],
    permission: "Aucune",
    category: "Information",

    async run(bot, message, args) {

        const proprio = "Keyzox#5016"
        const dev = "Keyzox#5016"
        const name = `${bot.user.username}`
        const tag = `2859`
        const id = `${bot.user.id}`

        let Embed = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Informations sur le bot`)
        .setDescription(`> <:Owner:1008831330294972549> **Propriétaire :** \`${proprio}\`\n> <:Crown:1008831290524569751> **Développeur :** \`${dev}\`\n> <:Bots:1008831284186984579> **Nom :** \`${name}\`\n> <:Channel:1008852662504149052> **Tag :** \`${tag}\`\n> <:Identifiant:1008869989979263120> **Identifiant :** \`${id}\`\n> <:Info:1008862520456515655> **Nombre de commandes :** \`${bot.commands.size}\`\n> <:discordjs:1010667563186933820> **Version de discord.js :** \`v13.9.0\`\n> <:nodejs:1010667949490712576> **Version de node.js :** \`v16.16.0\``)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setImage(message.guild.bannerURL({ dynamic: true, size: 4096 }))
        .setTimestamp()
        .setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        var Button = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
        .setStyle('LINK')
        .setEmoji('<:Link:1008831299835932752>')
        .setLabel('Ajouter le bot')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=997655923562651648&permissions=8&scope=bot%20applications.commands'),
        new Discord.MessageButton()
        .setStyle('LINK')
        .setEmoji('<:Link:1008831299835932752>')
        .setLabel('Serveur support')
        .setURL('https://discord.gg/SCWXHXj2du'))

        await message.reply({ embeds: [Embed], components: [Button] })
    }
})