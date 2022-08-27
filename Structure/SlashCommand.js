const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { SlashCommandBuilder } = require("@discordjs/builders")
const { token } = require("../config")

module.exports = async(bot) => {

  const commands = [
    
    new SlashCommandBuilder()
    .setName("world")
    .setDescription("Permet d'affichez des fuseaux horraire"),

    new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Permet d'avoir des informations sur un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à qui vous voulez les informations").setRequired(false)),

    new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Permet d'avoir des informations sur le serveur"),

    new SlashCommandBuilder()
    .setName("paypal")
    .setDescription("Permet de connaître le paypal de Keyzox"),

    new SlashCommandBuilder()
    .setName("social")
    .setDescription("Permet de connaître les réseaux sociaux de Keyzox"),

    new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Permet de connaître la latence du bot"),

    new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Permet d'avoir des informations sur le bot"),

    new SlashCommandBuilder()
    .setName("help")
    .setDescription("Permet de connaître toutes les commandes du bot")
    .addStringOption(option => option.setName("commande").setDescription("La commande où vous voulez les informations").setRequired(false)),

    new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("Permet de connaître le dernier message supprimé du salon"),

    new SlashCommandBuilder()
    .setName("channeldelete")
    .setDescription("Permet de supprimer tous les messages d'un salon"),

    new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Permet de rendre temporairement muet un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à rendre muet").setRequired(true))
    .addStringOption(option => option.setName("temps").setDescription("Le temps du muet").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du muet").setRequired(false)),

    new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Permet de rendre la parole d'un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à rendre la parole").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du rendu de parole").setRequired(false)),

    new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Permet d'expulser un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à rendre muet").setRequired(true)),

    new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Permet de bloquer un salon")
    .addChannelOption(option => option.setName("salon").setDescription("Le salon à bloquer").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du bloquage").setRequired(false)),

    new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Permet de débloquer un salon")
    .addChannelOption(option => option.setName("salon").setDescription("Le salon à débloquer").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du débloquage").setRequired(false)),

    new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Permet de bannir définitivement un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à bannir").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du bannissement").setRequired(false)),

    new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Permet de débannir un utilisateur")
    .addUserOption(option => option.setName("membre").setDescription("Le membre à débannir").setRequired(true))
    .addStringOption(option => option.setName("raison").setDescription("La raison du débannissement").setRequired(false)),
]
  
  const rest = new REST({ version: "9" }).setToken(token);

  bot.guilds.cache.forEach(async guild => {

    await rest.put(Routes.applicationGuildCommands(bot.user.id, guild.id), { body: commands });
  })

  console.log(`
  ╔═════════════════════════════╗
  ║  Les slashs commandes ont   ║
  ║   été créées avec succès    ║
  ╚═════════════════════════════╝`)
}  