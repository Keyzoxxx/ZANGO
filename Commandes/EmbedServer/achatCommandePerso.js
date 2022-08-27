const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "commandepersonnaliser",
    alias: ["commandepersonnaliser", "commandeperso"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "EmbedServeur",

    async run(bot, message, args) {

        let EmbedAchatCommandePersonnaliser = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Commande personnalisé`)
        .setDescription(`**Prix du bot :** ...€ (le prix sera donné à la fin en fonction de la commande avec l'hébergement inclus)\n\nDites-moi une ou plusieurs commande(s) que vous souhaitez avoir sur votre serveur en ouvrant un ticket dans la catégorie \`achat\`\n\nEt aussi si vous le souhaitez, le bot peut avoir le nom que vous voulez !\n(1€ en plus)\n\nPour plus d'information veuillez ouvrir un ticket dans la catégorie \`Question\` !`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        var ButtonAchatCommandePersonnaliser = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
        .setStyle('LINK')
        .setLabel('Ticket')
        .setURL('https://discord.com/channels/1003630949067669624/1003728097335591003/1003970400260194305')
        );

        message.delete()
        message.channel.send({embeds: [EmbedAchatCommandePersonnaliser], components:[ButtonAchatCommandePersonnaliser]})
    }
})