const Discord = require("discord.js")
const transcript = require("discord-html-transcripts")
const Event = require("../../Structure/Event");

module.exports = new Event("interactionCreate", async (bot, interaction, permission, args) => {

  if(interaction.isCommand()) {

    let command = bot.commands.get(interaction.commandName)

    let Embed1 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous n'avez pas la permission requise pour exécuter la commande \`!${command.name}\` !`)

    let Embed2 = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setDescription(`<:error:1008597496785805353> Vous n'avez pas la permission requise pour exécuter la commande \`!${command.name}\` !`)
    
    if(command.permission === "Développeur" && interaction.user.id !== "940232076626640897") return interaction.reply({embeds: [Embed1]})
    if(command.permission !== "Aucune" && command.permission !== "Développeur" && !interaction.member.permissions.has(new Discord.Permissions(command.permission))) return interaction.reply({embeds: [Embed2]})

    command.run(bot, interaction, interaction.options)
  }
 
  if(interaction.isButton()) {
    if(interaction.customId === "valided") {
      await interaction.member.roles.add('1003726771528679554')
    }
    else if(interaction.customId === "accesshelp") {
        let EmbedHelp = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Comment accéder aux commandes ?')
        .setDescription(`- Si vous souhaitez avoir des informations sur une commande précise, faites \`!help\` + la commande que vous voulez.\n- Si vous cherchez une commande, je vous laisse choisir une des catégories dans le menu déroulant juste en dessous.`)
        .addField('Liens utiles', `> [Serveur Discord](https://discord.gg/SCWXHXj2du)\n> [Invitation Keyzox Support](https://discord.com/api/oauth2/authorize?client_id=995016266807005245&permissions=8&scope=bot%20applications.commands)`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
       var MenuHelp = new Discord.MessageActionRow()
       .addComponents(new Discord.MessageSelectMenu()
       .setCustomId('menuhelp')
       .setMaxValues(1)
       .setMinValues(0)
       .setPlaceholder('Sélectionner la catégorie que vous voulez !')
       .addOptions([
        {
          label: "Acceuil", 
          description: "Revenir a l'accueil du menu",  
          emoji: "<:House:1008863568910884965>", 
          value: "acceuil"
        }, 
        {
          label: "Modération", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Staff:1008831321608568905>", 
          value: "moderation"
        }, 
        {
          label: "Information", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Info:1008862520456515655>", 
          value: "information"
        }, 
        {
         label: "Utilitaire", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Etiquette:1008852661044514877>", 
         value: "utilitaire"
        }, 
        {
         label: "Divers", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Server_Partener:1008831325605724270>", 
         value: "divers"
        }, 
        {
          label: "Fun", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Giveaway:1008834408519827617>", 
          value: "fun"
        }, 
        {
          label: "Niveaux", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Filter:1008831291724144761>", 
          value: "niveaux"
        }, 
        {
          label: "Fermer", 
          description: "Fermer le menu d'aide",  
          emoji: "<:error:1008597496785805353>", 
          value: "fermer"
        },
         ])
       );

       interaction.message.delete()
       interaction.channel.send({embeds: [EmbedHelp], components: [MenuHelp]})
    }
    else if(interaction.customId === "reglement") {
      let EmbedValidationReglement = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:success:1008597626154926141> Vous avez validé le règlement avec succès ! Vous pouvez maintenant accéder au reste du serveur !`)
      
      await interaction.member.roles.add('1003726543266254998')
      await interaction.reply({embeds: [EmbedValidationReglement], ephemeral: true})
    }
    else if(interaction.customId === "closeticket1") {
      let EmbedSendCloseTicket = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Vous n'avez pas la permission requise pour fermer le ticket !`)

      if(!interaction.member.permissions.has(new Discord.Permissions('MANAGE_CHANNELS'))) return interaction.reply({embeds: [EmbedSendCloseTicket], ephemeral: true})

      let EmbedCloseTicket = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`Êtes-vous sûr de vouloir fermer le ticket ?`)

      var Button = new Discord.MessageActionRow()
          .addComponents(new Discord.MessageButton()
          .setCustomId('oui')
          .setLabel("Oui")
          .setStyle('SUCCESS'),
          new Discord.MessageButton()
          .setCustomId('non')
          .setLabel("Non")
          .setStyle('DANGER')
          );
      
      await interaction.reply({embeds: [EmbedCloseTicket], components: [Button]});
    }
    else if(interaction.customId === "oui") {
      interaction.channel.delete();
    }
    else if(interaction.customId === "non") {
      interaction.message.delete()
    }
    else if(interaction.customId === "transcript") {
      let EmbedSendCloseTicket = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:error:1008597496785805353> Vous n'avez pas la permission requise pour demander le transcript du ticket !`)

      if(!interaction.member.permissions.has(new Discord.Permissions('MANAGE_CHANNELS'))) return interaction.reply({embeds: [EmbedSendCloseTicket], ephemeral: true})

      let EmbedSendTranscript = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`<:success:1008597626154926141> Transcript envoyé avec succès !`)
      let EmbedTranscript = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setDescription(`📑 Transcript de ${interaction.message.embeds[0].description.split(" ")[0]}`)

      await interaction.deferReply()
      await bot.channels.cache.get("1003640431462068255").send( {embeds: [EmbedTranscript], files: [await transcript.createTranscript(interaction.channel)]})
      await interaction.editReply({embeds: [EmbedSendTranscript], ephemeral: true})
    }
  }


  if(interaction.isSelectMenu()) {
    if(interaction.customId === 'menuticket') {
      if(interaction.values == 'help') {
        let channel = await interaction.guild.channels.create(`Help-${interaction.user.username}`, {type: "GUILD_TEXT"})
            await channel.setParent('1003728475238187199')

            await channel.permissionOverwrites.create(interaction.user, {
                SEND_MESSAGES: true,
                EMBED_LINKS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            })
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false,
                EMBED_LINKS: false,
                VIEW_CHANNEL: false,
                READ_MESSAGE_HISTORY: false
            })

          let EmbedOpenTicket = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setDescription(`<:success:1008597626154926141> Votre ticket a été créé avec succès ${channel} !`)
          
          let EmbedTicketHelp = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setTitle('Ticket ouvert')
          .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nExpliquez-nous en détail votre problème !\n(Si il s'agit d'une erreur, je vous laisse fermer le ticket)")
          .setTimestamp()
          .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
          var Button = new Discord.MessageActionRow()
          .addComponents(new Discord.MessageButton()
          .setCustomId('closeticket1')
          .setLabel("Fermer le ticket")
          .setStyle('DANGER')
          .setEmoji('<:Trash:1009925838168412192>'),
          new Discord.MessageButton()
          .setCustomId('transcript')
          .setLabel("Demander le transcript")
          .setStyle('PRIMARY')
          .setEmoji('📑')
          );
          channel.send({embeds: [EmbedTicketHelp], components: [Button]})

        interaction.reply({embeds: [EmbedOpenTicket], ephemeral: true})
      }
      else if(interaction.values == 'achat') {
        let channel = await interaction.guild.channels.create(`Achat-${interaction.user.username}`, {type: "GUILD_TEXT"})
            await channel.setParent('1003728607732039681')

            await channel.permissionOverwrites.create(interaction.user, {
                SEND_MESSAGES: true,
                EMBED_LINKS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            })
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false,
                EMBED_LINKS: false,
                VIEW_CHANNEL: false,
                READ_MESSAGE_HISTORY: false
            })

          let EmbedOpenTicket = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setDescription(`<:success:1008597626154926141> Votre ticket a été créé avec succès ${channel} !`)
          
          let EmbedTicketAchat = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setTitle('Ticket ouvert')
          .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nDites-moi se vous voulez acheter !\n(Si il s'agit d'une erreur, je vous laisse fermer le ticket)")
          .setTimestamp()
          .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
          var Button = new Discord.MessageActionRow()
          .addComponents(new Discord.MessageButton()
          .setCustomId('closeticket1')
          .setLabel("Fermer le ticket")
          .setStyle('DANGER')
          .setEmoji('<:Trash:1009925838168412192>'),
          new Discord.MessageButton()
          .setCustomId('transcript')
          .setLabel("Demander le transcript")
          .setStyle('PRIMARY')
          .setEmoji('📑')
          );
          channel.send({embeds: [EmbedTicketAchat], components: [Button]})

        interaction.reply({embeds: [EmbedOpenTicket], ephemeral: true})
      }
      else if(interaction.values == 'question') {
        let channel = await interaction.guild.channels.create(`Question-${interaction.user.username}`, {type: "GUILD_TEXT"})
            await channel.setParent('1003969392977121300')

            await channel.permissionOverwrites.create(interaction.user, {
                SEND_MESSAGES: true,
                EMBED_LINKS: true,
                VIEW_CHANNEL: true,
                READ_MESSAGE_HISTORY: true
            })
            await channel.permissionOverwrites.create(interaction.guild.roles.everyone, {
                SEND_MESSAGES: false,
                EMBED_LINKS: false,
                VIEW_CHANNEL: false,
                READ_MESSAGE_HISTORY: false
            })

          let EmbedOpenTicket = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setDescription(`<:success:1008597626154926141> Votre ticket a été créé avec succès ${channel} !`)
          
          let EmbedTicketQuestion = new Discord.MessageEmbed()
          .setColor(bot.color)
          .setTitle('Ticket ouvert')
          .setDescription("<@" + interaction.user.id + "> Voici votre ticket.\nQuelle est votre question ?\n(Si il s'agit d'une erreur, je vous laisse fermer le ticket)")
          .setTimestamp()
          .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
  
          var Button = new Discord.MessageActionRow()
          .addComponents(new Discord.MessageButton()
          .setCustomId('closeticket1')
          .setLabel("Fermer le ticket")
          .setStyle('DANGER')
          .setEmoji('<:Trash:1009925838168412192>'),
          new Discord.MessageButton()
          .setCustomId('transcript')
          .setLabel("Demander le transcript")
          .setStyle('PRIMARY')
          .setEmoji('📑')
          );
          channel.send({embeds: [EmbedTicketQuestion], components: [Button]})

        interaction.reply({embeds: [EmbedOpenTicket], ephemeral: true})
      }
    }
    else if(interaction.customId === 'menuhelp') {
      if(interaction.values == 'acceuil') {

        let EmbedHelp = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Comment accéder aux commandes ?')
        .setDescription(`- Si vous souhaitez avoir des informations sur une commande précise, faites \`!help\` + la commande que vous voulez.\n- Si vous cherchez une commande, je vous laisse choisir une des catégories dans le menu déroulant juste en dessous.`)
        .addField('Liens utiles', `> [Serveur Discord](https://discord.gg/ztD4eRCG25)\n> [Invitation Keyzox Protect](https://discord.com/api/oauth2/authorize?client_id=995016266807005245&permissions=8&scope=bot%20applications.commands)`)
        .setTimestamp()
        .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
       var MenuHelp = new Discord.MessageActionRow()
       .addComponents(new Discord.MessageSelectMenu()
       .setCustomId('menuhelp')
       .setMaxValues(1)
       .setMinValues(0)
       .setPlaceholder('Sélectionner la catégorie que vous voulez !')
       .addOptions([
        {
          label: "Acceuil", 
          description: "Revenir a l'accueil du menu",  
          emoji: "<:House:1008863568910884965>", 
          value: "acceuil"
        }, 
        {
          label: "Modération", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Staff:1008831321608568905>", 
          value: "moderation"
        }, 
        {
          label: "Information", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Info:1008862520456515655>", 
          value: "information"
        }, 
        {
         label: "Utilitaire", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Etiquette:1008852661044514877>", 
         value: "utilitaire"
        }, 
        {
         label: "Divers", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Server_Partener:1008831325605724270>", 
         value: "divers"
        }, 
        {
          label: "Fun", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Giveaway:1008834408519827617>", 
          value: "fun"
        }, 
        {
          label: "Niveaux", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Filter:1008831291724144761>", 
          value: "niveaux"
        }, 
        {
          label: "Fermer", 
          description: "Fermer le menu d'aide",  
          emoji: "<:error:1008597496785805353>", 
          value: "fermer"
        },
         ])
       );

       interaction.message.delete()
       interaction.channel.send({embeds: [EmbedHelp], components: [MenuHelp]})
      }
      else if(interaction.values == 'moderation') {

        let EmbedModeration = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Voici la catégorie → Modération')
       .setDescription(`> \`!ban\`→ Permet de bannir définitivement un utilisateur.\n> \`!unban\`→ Permet de débannir un utilisateur.\n> \`!mute\`→ Permet de rendre muet un utilisateur.\n> \`!unmute\`→ Permet de rendre la parole d'un utilisateur.\n> \`!kick\`→ Permet d'expulser un utilisateur.\n> \`!lock\`→ Permet de bloquer un salon.\n> \`!unlock\`→ Permet de débloquer un salon.\n> \`!slowmode\`→ Permet de mettre un mode lent sur un salon.\n> \`!clear\`→ Permet de supprimer un nombre de messages.\n> \`!clearchannel\`→ Permet de supprimer tous les messages d'un salon.\n> \`!prune\`→ Permet de supprimer un nombre de messages d'un utilisateur.\n> \`!snipe\`→ Permet de connaître le dernier message supprimé du salon.\n> \`!say\`→ Permet d'envoyer un message avec l'identité du bot.\n> \`!channeldelete\`→ Permet de supprimer tous les messages d'un salon.\n> \`!sudo\`→ Permet de créer un webhook pour se faire passer pour quelqu'un.\n> \`!embedticket\`→ Permet d'envoyer l'embed des tickets.\n> \`!embedreport\`→ Permet d'envoyer l'embed des reports.\n> \`!embedrule\`→ Permet d'envoyer l'embed du règlement.`)
       .setTimestamp()
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
       var MenuHelp = new Discord.MessageActionRow()
       .addComponents(new Discord.MessageSelectMenu()
       .setCustomId('menuhelp')
       .setMaxValues(1)
       .setMinValues(0)
       .setPlaceholder('Sélectionner la catégorie que vous voulez !')
       .addOptions([
        {
          label: "Acceuil", 
          description: "Revenir a l'accueil du menu",  
          emoji: "<:House:1008863568910884965>", 
          value: "acceuil"
        }, 
        {
          label: "Modération", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Staff:1008831321608568905>", 
          value: "moderation"
        }, 
        {
          label: "Information", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Info:1008862520456515655>", 
          value: "information"
        }, 
        {
         label: "Utilitaire", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Etiquette:1008852661044514877>", 
         value: "utilitaire"
        }, 
        {
         label: "Divers", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Server_Partener:1008831325605724270>", 
         value: "divers"
        }, 
        {
          label: "Fun", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Giveaway:1008834408519827617>", 
          value: "fun"
        }, 
        {
          label: "Niveaux", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Filter:1008831291724144761>", 
          value: "niveaux"
        }, 
        {
          label: "Fermer", 
          description: "Fermer le menu d'aide",  
          emoji: "<:error:1008597496785805353>", 
          value: "fermer"
        },
        ])
       );

       interaction.message.delete()
       interaction.channel.send({embeds: [EmbedModeration], components: [MenuHelp]})
      }
      else if(interaction.values == 'information') {

        let EmbedInformation = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Voici la catégorie → Information')
       .setDescription(`> \`!help\`→ Permet de connaître toutes les commandes du bot.\n> \`!serverinfo\`→ Permet d'avoir des informations sur le serveur.\n> \`!userinfo\`→ Permet d'avoir des informations sur un utilisateur.\n> \`!paypal\`→ Permet de connaître le paypal de Keyzox.\n> \`!social\`→ Permet de connaître les réseaux sociaux de Keyzox.`)
       .setTimestamp()
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
       var MenuHelp = new Discord.MessageActionRow()
       .addComponents(new Discord.MessageSelectMenu()
       .setCustomId('menuhelp')
       .setMaxValues(1)
       .setMinValues(0)
       .setPlaceholder('Sélectionner la catégorie que vous voulez !')
       .addOptions([
        {
          label: "Acceuil", 
          description: "Revenir a l'accueil du menu",  
          emoji: "<:House:1008863568910884965>", 
          value: "acceuil"
        }, 
        {
          label: "Modération", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Staff:1008831321608568905>", 
          value: "moderation"
        }, 
        {
          label: "Information", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Info:1008862520456515655>", 
          value: "information"
        }, 
        {
         label: "Utilitaire", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Etiquette:1008852661044514877>", 
         value: "utilitaire"
        }, 
        {
         label: "Divers", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Server_Partener:1008831325605724270>", 
         value: "divers"
        }, 
        {
          label: "Fun", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Giveaway:1008834408519827617>", 
          value: "fun"
        }, 
        {
          label: "Niveaux", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Filter:1008831291724144761>", 
          value: "niveaux"
        }, 
        {
          label: "Fermer", 
          description: "Fermer le menu d'aide",  
          emoji: "<:error:1008597496785805353>", 
          value: "fermer"
        },
         ])
       );

       interaction.message.delete()
       interaction.channel.send({embeds: [EmbedInformation], components: [MenuHelp]})
      }
      else if(interaction.values == 'utilitaire') {

        let EmbedInformation = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Voici la catégorie → Utilitaire')
       .setDescription(`> \`!report\`→ Permet de report un utilisateur.\n> \`!suggest\`→ Permet de créer une suggestion.\n> \`!survey\`→ Permet de créer un sondage.`)
       .setTimestamp()
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
       var MenuHelp = new Discord.MessageActionRow()
       .addComponents(new Discord.MessageSelectMenu()
       .setCustomId('menuhelp')
       .setMaxValues(1)
       .setMinValues(0)
       .setPlaceholder('Sélectionner la catégorie que vous voulez !')
       .addOptions([
        {
          label: "Acceuil", 
          description: "Revenir a l'accueil du menu",  
          emoji: "<:House:1008863568910884965>", 
          value: "acceuil"
        }, 
        {
          label: "Modération", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Staff:1008831321608568905>", 
          value: "moderation"
        }, 
        {
          label: "Information", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Info:1008862520456515655>", 
          value: "information"
        }, 
        {
         label: "Utilitaire", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Etiquette:1008852661044514877>", 
         value: "utilitaire"
        }, 
        {
         label: "Divers", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Server_Partener:1008831325605724270>", 
         value: "divers"
        }, 
        {
          label: "Fun", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Giveaway:1008834408519827617>", 
          value: "fun"
        }, 
        {
          label: "Niveaux", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Filter:1008831291724144761>", 
          value: "niveaux"
        }, 
        {
          label: "Fermer", 
          description: "Fermer le menu d'aide",  
          emoji: "<:error:1008597496785805353>", 
          value: "fermer"
        },
         ])
       );

       interaction.message.delete()
       interaction.channel.send({embeds: [EmbedInformation], components: [MenuHelp]})
      }
      else if(interaction.values == 'fun') {

        let EmbedFun = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Voici la catégorie → Fun')
       .setDescription(`> \`!8ball\`→ Permet de poser une question au bot.`)
       .setTimestamp()
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
       var MenuHelp = new Discord.MessageActionRow()
       .addComponents(new Discord.MessageSelectMenu()
       .setCustomId('menuhelp')
       .setMaxValues(1)
       .setMinValues(0)
       .setPlaceholder('Sélectionner la catégorie que vous voulez !')
       .addOptions([
        {
          label: "Acceuil", 
          description: "Revenir a l'accueil du menu",  
          emoji: "<:House:1008863568910884965>", 
          value: "acceuil"
        }, 
        {
          label: "Modération", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Staff:1008831321608568905>", 
          value: "moderation"
        }, 
        {
          label: "Information", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Info:1008862520456515655>", 
          value: "information"
        }, 
        {
         label: "Utilitaire", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Etiquette:1008852661044514877>", 
         value: "utilitaire"
        }, 
        {
         label: "Divers", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Server_Partener:1008831325605724270>", 
         value: "divers"
        }, 
        {
          label: "Fun", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Giveaway:1008834408519827617>", 
          value: "fun"
        }, 
        {
          label: "Niveaux", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Filter:1008831291724144761>", 
          value: "niveaux"
        }, 
        {
          label: "Fermer", 
          description: "Fermer le menu d'aide",  
          emoji: "<:error:1008597496785805353>", 
          value: "fermer"
        },
         ])
       );

       interaction.message.delete()
       interaction.channel.send({embeds: [EmbedFun], components: [MenuHelp]})
      }
      else if(interaction.values == 'divers') {

        let EmbedDivers = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Voici la catégorie → Divers')
       .setDescription(`> \`!howgay\`→ Permet de savoir votre pourcentage de gaytitude.\n> \`!world\`→ Permet d'affichez des fuseaux horraire.\n> \`!calculette\`→ Permet de faire des calculs.`)
       .setTimestamp()
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
       var MenuHelp = new Discord.MessageActionRow()
       .addComponents(new Discord.MessageSelectMenu()
       .setCustomId('menuhelp')
       .setMaxValues(1)
       .setMinValues(0)
       .setPlaceholder('Sélectionner la catégorie que vous voulez !')
       .addOptions([
        {
          label: "Acceuil", 
          description: "Revenir a l'accueil du menu",  
          emoji: "<:House:1008863568910884965>", 
          value: "acceuil"
        }, 
        {
          label: "Modération", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Staff:1008831321608568905>", 
          value: "moderation"
        }, 
        {
          label: "Information", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Info:1008862520456515655>", 
          value: "information"
        }, 
        {
         label: "Utilitaire", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Etiquette:1008852661044514877>", 
         value: "utilitaire"
        }, 
        {
         label: "Divers", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Server_Partener:1008831325605724270>", 
         value: "divers"
        }, 
        {
          label: "Fun", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Giveaway:1008834408519827617>", 
          value: "fun"
        }, 
        {
          label: "Niveaux", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Filter:1008831291724144761>", 
          value: "niveaux"
        }, 
        {
          label: "Fermer", 
          description: "Fermer le menu d'aide",  
          emoji: "<:error:1008597496785805353>", 
          value: "fermer"
        },
         ])
       );

       interaction.message.delete()
       interaction.channel.send({embeds: [EmbedDivers], components: [MenuHelp]})
      }
      else if(interaction.values == 'niveaux') {

        let EmbedNiveaux = new Discord.MessageEmbed()
        .setColor(bot.color)
        .setTitle('Voici la catégorie → Niveaux')
       .setDescription(`> \`\`→ .`)
       .setTimestamp()
       .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
       var MenuHelp = new Discord.MessageActionRow()
       .addComponents(new Discord.MessageSelectMenu()
       .setCustomId('menuhelp')
       .setMaxValues(1)
       .setMinValues(0)
       .setPlaceholder('Sélectionner la catégorie que vous voulez !')
       .addOptions([
        {
          label: "Acceuil", 
          description: "Revenir a l'accueil du menu",  
          emoji: "<:House:1008863568910884965>", 
          value: "acceuil"
        }, 
        {
          label: "Modération", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Staff:1008831321608568905>", 
          value: "moderation"
        }, 
        {
          label: "Information", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Info:1008862520456515655>", 
          value: "information"
        }, 
        {
         label: "Utilitaire", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Etiquette:1008852661044514877>", 
         value: "utilitaire"
        }, 
        {
         label: "Divers", 
         description: "Obtenir les commandes de cette catégorie",  
         emoji: "<:Server_Partener:1008831325605724270>", 
         value: "divers"
        }, 
        {
          label: "Fun", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Giveaway:1008834408519827617>", 
          value: "fun"
        }, 
        {
          label: "Niveaux", 
          description: "Obtenir les commandes de cette catégorie",  
          emoji: "<:Filter:1008831291724144761>", 
          value: "niveaux"
        }, 
        {
          label: "Fermer", 
          description: "Fermer le menu d'aide",  
          emoji: "<:error:1008597496785805353>", 
          value: "fermer"
        },
         ])
       );

       interaction.message.delete()
       interaction.channel.send({embeds: [EmbedNiveaux], components: [MenuHelp]})
      }
      else if(interaction.values == 'fermer') {
        interaction.message.delete()
      }
    }
  }
})
