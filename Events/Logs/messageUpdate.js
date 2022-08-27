const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const { ChannelLogsMessageUpdate } = require("../../config");

module.exports = new Event("messageUpdate", async (bot, oldMessage, newMessage) => {

    if(oldMessage.author.bot) return;
    
    let Embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Message modifié")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setDescription(`<:Etiquette:1008852661044514877> **Auteur du message :** ${oldMessage.author}\n<:Ping:1008831313425477662> **Date de création du message :** <t:${Math.floor(oldMessage.createdAt / 1000)}:F>\n<:Reason:1009184198143246478> **Ancien contenu :** \`\`\`${oldMessage.content}\`\`\`<:Reason:1009184198143246478> **Nouveau contenu :** \`\`\`${newMessage.content}\`\`\``)

    await bot.channels.cache.get(ChannelLogsMessageUpdate).send({embeds: [Embed]})
})