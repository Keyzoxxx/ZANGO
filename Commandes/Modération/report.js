const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "embedreport",
    description: "Permet d'envoyer l'embed des reports",
    utilisation: "",
    alias: ["embedreport", "ereport"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "EmbedServeur",

    async run(bot, message, args) {

        let EmbedReport = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Signaler un utilisateur`)
        .setDescription(`Pour signaler un utilisateur aux membres du staff, faites la commande \`!report\` !\nMerci de ne pas spam les reports !`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        
        message.delete()
        message.channel.send({embeds: [EmbedReport]})
    }
})