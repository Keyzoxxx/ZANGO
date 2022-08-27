const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "commandedebase",
    alias: ["commandedebase"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "EmbedServeur",

    async run(bot, message, args) {

        let EmbedAchatCommandeDeBase = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Commandes de base à vendre`)
        .setDescription(`**Les commandes de base sont :** .\n\n**Prix du bot :** 15€ (hébergement inclus)\n\nSi vous souhaitez achetez le bot avec les commandes de base, ouvrez un ticket dans la catégorie \`Achat\`\n\nEt aussi si vous le souhaitez, le bot peut avoir le nom que vous voulez !\n(1€ en plus)\n\nPour plus d'information veuillez ouvrir un ticket dans la catégorie \`Question\` !`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        var ButtonAchatCommandeDeBase = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
        .setStyle('LINK')
        .setLabel('Ticket')
        .setURL('https://discord.com/channels/1003630949067669624/1003728097335591003/1003970400260194305')
        );
        
        message.delete()
        message.channel.send({embeds: [EmbedAchatCommandeDeBase ], components:[ButtonAchatCommandeDeBase]})
    }
})