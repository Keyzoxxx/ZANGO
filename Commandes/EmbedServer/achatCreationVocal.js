const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "creationvocal",
    alias: ["creationvocal"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "EmbedServeur",

    async run(bot, message, args) {

        let EmbedAchatCreationVocal = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Système de création de vocal à vendre`)
        .setDescription(`**Prix du bot :** 5€ (hébergement inclus)\n\nSi vous souhaitez achetez le bot avec le sytème de création de vocal, ouvrez un ticket dans la catégorie \`Achat\`.(quand vous cliquez sur le premier salon, ça vous créer votre salon)\n\nEt aussi si vous le souhaitez, le bot peut avoir le nom que vous voulez !\n(1€ en plus)\n\nPour plus d'information veuillez ouvrir un ticket dans la catégorie \`Question\` !`)
        .setImage('https://media.discordapp.net/attachments/1003971545212924025/1004000177817915392/dqz.PNG')
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        var ButtonAchatCreationVocal = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
        .setStyle('LINK')
        .setLabel('Ticket')
        .setURL('https://discord.com/channels/1003630949067669624/1003728097335591003/1003970400260194305')
        );

        message.delete()
        message.channel.send({embeds: [EmbedAchatCreationVocal ], components:[ButtonAchatCreationVocal]})
    }
})