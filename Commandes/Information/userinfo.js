const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

    name: "userinfo",
    description: "Permet d'avoir des informations sur un utilisateur",
    utilisation: "(membre)",
    alias: ["userinfo", "ui"],
    permission: "Aucune",
    category: "Information",

    async run(bot, message, args) {

        try {

            let user;
            if(message.user ? args._hoistedOptions.length >= 1 : args.length >= 1) {
              let Embed1 = new Discord.MessageEmbed()
              .setColor(bot.color)
              .setDescription(`<:error:1008597496785805353> Aucune personne trouvée !`)  
              
              user = message.user ? await bot.users.fetch(args._hoistedOptions[0].value) : (message.mentions.users.first() || await bot.users.fetch(args[0]))
                if(!user) return message.reply({embeds: [Embed1]})
            } else user = message.user ? message.user : message.author;
            let member = message.guild.members.cache.get(user.id)

            let Embed = new Discord.MessageEmbed()
            .setColor(bot.color)
            .setTitle(`Informations sur ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addField("Informations sur l'utilisateur :", `> <:Members:1008831302293803108> **Pseudo :** \`${user.username}\`\n> <:Channel:1008852662504149052> **Tag :** \`${user.discriminator}\`\n> <:Identifiant:1008869989979263120> **Identifiant :** \`${user.id}\`\n> <:Link:1008831299835932752> **URL de l'avatar :** [Avatar](${user.displayAvatarURL({dynamic: true})})\n> <:Bots:1008831284186984579> **Robot :** \`${user.bot ? "Oui" : "Non"}\`\n> <:VIP:1008831324246769815> **Status :** \`${member ? member.presence ? member.presence.status : "Hors-ligne" : "Inconnu"}\`\n> <:Filter:1008831291724144761> **Badges :** \`${(await user.fetchFlags()).toArray().length >= 1 ? (await user.fetchFlags()).toArray().join(" ") : "Non"}\`\n> <:Invite:1008831294559506452> **Date de création du compte :** <t:${Math.floor(user.createdAt / 1000)}:F>\n`)
            member ? Embed.addField("Informations sur l'utilisateur :", `> <:Members:1008831302293803108> **Surnom :** \`${member.nickname ? member.nickname : "Aucun"}\`\n> <:Roles:1008852577791778827> **Rôles (${member.roles.cache.size}) :** ${member.roles.cache.map(r => `${r}`).join(" ")}\n> <:Ping:1008831313425477662> **Date d'arrivée sur le serveur :** <t:${Math.floor(member.joinedAt / 1000)}:F>`) : ""
            Embed.setImage(await (await bot.users.fetch(user.id, {force: true})).bannerURL({dynamic: true, size: 4096}))
            .setTimestamp()
            .setFooter({ text: bot.user.username, iconURL: bot.user.displayAvatarURL({ dynamic: true }) })

            await message.reply({embeds: [Embed]})

        } catch (err) {

          let Embed2 = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setDescription('<:error:1008597496785805353> Aucune personne trouvée !')

          return message.reply({embeds: [Embed2]})
          
        }
    }
})