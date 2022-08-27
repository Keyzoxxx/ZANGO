const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const SlashCommand = require("../../Structure/SlashCommand")

module.exports = new Event("ready", async bot => {

  await SlashCommand(bot);

  let totalUsers = bot.guilds.cache.reduce((acc, value) => acc + value.memberCount, 0)
  var activities = [ `${bot.guilds.cache.size} serveur`, `${totalUsers} membres` ], i = 0;
  setInterval(() => bot.user.setActivity(`!help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),5000)

  console.log(`
  ╔═════════════════════════════╗
  ║  Connecté sur ${bot.guilds.cache.size} serveur(s)  ║
  ╚═════════════════════════════╝`)
})
