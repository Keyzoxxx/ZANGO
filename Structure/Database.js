const Guild = require('../Schema/Guild')

module.exports.fetchGuild = async function(key) {
    let guildDB = await Guild.findOne({ id: key })

    if(guildDB) {
        return guildDB
    } else {
        guildDB = new Guild({
            id: key,
            registeredAt: Date.now()
        })
        await guildDB.save().catch((err) => console.log(err))
        return guildDB
    }
}