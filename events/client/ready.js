const { ErelaClient, Utils } = require("erela.js");
const { Discord, Client, message } = require("discord.js");
const { nodes } = require("../../botconfig.json");
const { prefix } = require("../../botconfig.json");

module.exports = bot => {
    console.log(`${bot.user.username} is online`);
   
    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

    let activities = [ `| ${bot.guilds.size} serwery!`, `by DareQ_#4735` ], i = 0;
    setInterval(() => bot.user.setActivity(`@DBIT-BOT ${activities[i++ % activities.length]}`, { type: "PLAYING" }), 15000)

};