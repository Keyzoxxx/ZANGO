const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "embedrule",
    description: "Permet d'envoyer l'embed du règlement",
    utilisation: "",
    alias: ["embedrule", "erule", "rule"],
    permission: Discord.Permissions.FLAGS.MANAGE_GUILD,
    category: "EmbedServeur",

    async run(bot, message, args, interaction) {

        let EmbedReglement = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Règlement du serveur')
        .setDescription(`- Le respect des autres, commence par le respect de soi-même, soyez aimables avec tous et toutes.\n- La pub est interdite, que se soit par MP ou dans le discord.\n- Le SPAM est interdit, du coup sanctionné, pour le bien des membres.\n- Les soundboards, modificateurs de voix et spam audio sont interdits.\n- Ne pas envoyer des photos à caractères pornographiques ou choquants.\n- Ne pas envoyer des fichiers pouvant nuire aux utilisateurs.\n- Les salons ont des noms, merci de les utiliser correctement.\n- Toutes discriminations, racismes ou antisémitisme sera sanctionné d'un bannissement définitif sans retour.\n- Toute autre chose immorale, comme le harcèlement ou pédophilie aura recours à de lourdes sanctions, plus que le BAN DEF.`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
        var ButtonReglement = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
        .setCustomId('reglement')
        .setStyle('SUCCESS')
        .setLabel('Valider le règlement')
        .setEmoji('<:success:1008597626154926141>')
        );
 
        message.delete()
        message.channel.send({embeds: [EmbedReglement], components: [ButtonReglement]})
    }
})