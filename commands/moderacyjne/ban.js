const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "ban",
        description: "Banuje oznaczonego użytkownika na serwerze. Wysyła informacje na kanał #logi. Jeżeli nie potrzebujesz nie twórz kanału #logi.",
        usage: "<@użytkownik> <powód>",
        category: "moderacyjne",
        accessableby: "Banowanie użytkowników, administrator",
        aliases: ["b", "banicja", "usunuser"]
    },
    run: async (bot, message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie masz uprawnień aby wykonać to polecenie!")

   let banMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
   if(!banMember) return message.channel.send("Proszę o podanie <@użytkownik>")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "Nie nadano powodu!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie posiadam upranień aby wykonać to polecenie! Potrzebuję: **Banowanie członków, administrator**")
   
   let cembed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} BAN`, message.guild.iconURL)
    .addField("Akcja:", "ban")
    .addField("Moderator:", message.author.username)
    .addField("Powód:", reason)
    .addField("Data:", message.createdAt.toLocaleString())
    .setFooter("© DBIT-BOT | Bany")
   
    banMember.send(cembed).then(() =>
   message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))


   message.channel.send(`**${banMember.user.tag}** został zbanowany!`).then(m => m.delete(5000))
   //© DBIT-BOT 
    let embed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Logi`, message.guild.iconURL)
    .addField("Akcja:", "ban")
    .addField("Użytkownik:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Powód:", reason)
    .addField("Data:", message.createdAt.toLocaleString())
    .setFooter("© DBIT-BOT | Logi")
    
        let sChannel = message.guild.channels.find(c => c.name === "logi")
        sChannel.send(embed)
    }
}