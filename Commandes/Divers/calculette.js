const Discord = require("discord.js");
const simplydjs = require("simply-djs");
const Command = require("../../Structure/Command")

module.exports = new Command({

  name: "calculette",
  description: "Permet de faire des calculs",
  utilisation: "",
  alias: ["calculette", "calcul", "math"],
  permission: Discord.Permissions.FLAGS.SEND_MESSAGES,
  category: "Divers",

  async run(bot, message, args) {
        simplydjs.calculator(message, {
          embedColor: '#00feff',
        })
    }
});