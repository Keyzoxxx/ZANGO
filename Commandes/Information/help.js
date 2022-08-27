const Discord = require("discord.js")
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "help",
  description: "Permet de connaître toutes les commandes du bot",
  utilisation: "",
  alias: ["help", "h", "aide"],
  permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
  category: "Information",

  async run(bot, message, args) {

    const command = message.user ? bot.alias.get(args._hoistedOptions.length !== 0 ? args._hoistedOptions[0].value : "") : bot.alias.get(args[0])

    if (!command) {

    try {
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
    
      message.delete()
      message.channel.send({embeds: [EmbedHelp], components: [MenuHelp]})
    } catch (err) {
      
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
      
      message.reply({embeds: [EmbedHelp], components: [MenuHelp]})
      }
    }

  if(command) { 
    try {
      let Embed = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle(`<:Info:1008862520456515655>  Voici les informations sur la commande → ${command.name}`)
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      .setDescription(`> <:Etiquette:1008852661044514877> **Nom de la commande :** \`${message.user ? args._hoistedOptions[0].value : args[0]}\`\n> <:Settings:1008831331561652275> **Description de la commande :** \`${command.description}\`\n> <:Server_Partener:1008831325605724270> **Utilisation de la commande :** \`${message.user ? args._hoistedOptions[0].value : args[0]} ${command.utilisation}\`\n> <:Ping:1008831313425477662> **Alias de la commande :** ${command.alias.filter(a => a !== (message.user ? args._hoistedOptions[0].value : args[0])).map(a => `\`${a}\``).join(" ")}\n> <:Filter:1008831291724144761> **Catégorie de la commande :** \`${command.category}\`\n> <:Staff:1008831321608568905> **Permission de la commande :** \`${new Discord.Permissions(command.permission).toArray(false)}\``)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
      var ButtonHelp = new Discord.MessageActionRow()
      .addComponents(new Discord.MessageButton()
      .setCustomId('accesshelp')
      .setLabel("Accéder au menu d'aide")
      .setStyle('SUCCESS')
      .setEmoji('<:success:1008597626154926141>'));
      
      message.delete()
      message.channel.send({embeds: [Embed], components: [ButtonHelp]})
    } catch (err) {
      let Embed = new Discord.MessageEmbed()
      .setColor(bot.color)
      .setTitle(`<:Info:1008862520456515655>  Voici les informations sur la commande → ${command.name}`)
      .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      .setDescription(`> <:Etiquette:1008852661044514877> **Nom de la commande :** \`${message.user ? args._hoistedOptions[0].value : args[0]}\`\n> <:Settings:1008831331561652275> **Description de la commande :** \`${command.description}\`\n> <:Server_Partener:1008831325605724270> **Utilisation de la commande :** \`${message.user ? args._hoistedOptions[0].value : args[0]} ${command.utilisation}\`\n> <:Ping:1008831313425477662> **Alias de la commande :** ${command.alias.filter(a => a !== (message.user ? args._hoistedOptions[0].value : args[0])).map(a => `\`${a}\``).join(" ")}\n> <:Filter:1008831291724144761> **Catégorie de la commande :** \`${command.category}\`\n> <:Staff:1008831321608568905> **Permission de la commande :** \`${new Discord.Permissions(command.permission).toArray(false)}\``)
      .setTimestamp()
      .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({dynamic: true}))
      var ButtonHelp = new Discord.MessageActionRow()
      .addComponents(new Discord.MessageButton()
      .setCustomId('accesshelp')
      .setLabel("Accéder au menu d'aide")
      .setStyle('SUCCESS')
      .setEmoji('<:success:1008597626154926141>'));
      
      message.reply({embeds: [Embed], components: [ButtonHelp]})
    }
    }
  }
})