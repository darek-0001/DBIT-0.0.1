const { Client, Collection, Discord } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();
const { RichEmbed } = require("discord.js");
const { cyan } = require("./colours.json");
const { prefix } = require("./botconfig.json");

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.on('message', async message => {
   
    let zEmbed = new RichEmbed()
    .setColor(cyan)
    .setAuthor(`DBIT-BOT`, bot.user.displayAvatarURL)
    .setDescription(`Witaj widzę że nie znasz mojego prefixu i komend.\nMój prefix: **${prefix}**\nListę komend znajdziesz pod **${prefix}pomoc**\n**__WAŻNA INFORMACJA:__** (m.in.: co zrobić jako pierwsze po dodaniu bota) znajdziesz pod !info`)
    .setTimestamp()
    if (message.isMentioned(bot.user)) return message.author.send(zEmbed);
});


bot.login(token);