const Discord = require("discord.js")
const Event = require("../../Structure/Event")
const { ChannelLogsMessageDelete } = require("../../config");

module.exports = new Event("messageDelete", async (bot, message) => {

    if(bot.snipe.get(message.channel.id)) await bot.snipe.delete(message.channel.id) && await bot.snipe.set(message.channel.id, message)
    else await bot.snipe.set(message.channel.id, message);
    
    if(message.author.bot) return;

    const AuditsLogs = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE',
        limit: 1
    })

    const LatestMessageDeleted = AuditsLogs.entries.first();
    
    let Embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Message supprimé")
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
    .setDescription(`<:Members:1008831302293803108> **Auteur du message :** ${message.author}\n<:Staff:1008831321608568905> **Auteur de la suppresion :** ${LatestMessageDeleted.executor}\n<:Ping:1008831313425477662> **Date de création du message :** <t:${Math.floor(message.createdAt / 1000)}:F>\n<:Reason:1009184198143246478> **Contenu :** \`\`\`${message.content}\`\`\``)

    await bot.channels.cache.get(ChannelLogsMessageDelete).send({embeds: [Embed]})
})