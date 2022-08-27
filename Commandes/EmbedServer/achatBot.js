const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "bot",
    alias: ["bot"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "EmbedServeur",

    async run(bot, message, args) {

        let EmbedAchatBot = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Bot à vendre`)
        .setDescription(`**Les commandes du bot disponible :** .\n\n**Prix du bot :** 30€ (hébergement inclus)\n\nSi vous souhaitez achetez le bot, ouvrez un ticket dans la catégorie \`Achat\`\n\nEt aussi si vous le souhaitez, le bot peut avoir le nom que vous voulez !\n(1€ en plus)\n\nPour plus d'information veuillez ouvrir un ticket dans la catégorie \`Question\` !`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        var ButtonAchatBot = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
        .setStyle('LINK')
        .setLabel('Ticket')
        .setURL('https://discord.com/channels/1003630949067669624/1003728097335591003/1003970400260194305')
        );
        
        message.delete()
        message.channel.send({embeds: [EmbedAchatBot], components:[ButtonAchatBot]})
    }
})