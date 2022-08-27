const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "systemeticket",
    alias: ["systemeticket"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "EmbedServeur",

    async run(bot, message, args) {

        let EmbedAchatTicket = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle(`Système de ticket à vendre`)
        .setDescription(`**Prix du bot :** 5€ (hébergement inclus)\n\nSi vous souhaitez achetez le bot avec le sytème de ticket avec un menu déroulant, ouvrez un ticket dans la catégorie \`Achat\`.(les choix dans le menu peuvent être modifié en fonction de votre choix)\n\nEt aussi si vous le souhaitez, le bot peut avoir le nom que vous voulez !\n(1€ en plus)\n\nPour plus d'information veuillez ouvrir un ticket dans la catégorie \`Question\` !`)
        .setImage('https://cdn.discordapp.com/attachments/1003760109027086377/1003968719711649822/Ticket.PNG')
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
        var ButtonAchatTicket = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
        .setStyle('LINK')
        .setLabel('Ticket')
        .setURL('https://discord.com/channels/1003630949067669624/1003728097335591003/1003970400260194305')
        );
        
        message.delete()
        message.channel.send({embeds: [EmbedAchatTicket], components:[ButtonAchatTicket]})
    }
})