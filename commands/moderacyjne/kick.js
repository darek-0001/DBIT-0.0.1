const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "kick",
        description: "Wyrzuca oznaczonego użytkownika z serwera. Wysyła informacje na kanał #logi. Jeżeli nie potrzebujesz nie twórz kanału #logi.",
        usage: "<@użytkownik> <powód>",
        category: "moderacyjne",
        accessableby: "Wyrzucanie użytkowników, administrator",
        aliases: ["k", "usunużytkownika"]
    },
    run: async (bot, message, args) => {
    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie posiadasz uprawnień aby wykonać to polecenie!")

    let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]) 
    if(!kickMember) return message.channel.send("Proszę o podanie <@użytkownik>")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Nie podano powodu!"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie posiadam upranień aby wykonać to polecenie! Potrzebuję: **Wyrzucanie użytkowników, administrator**")
    
    let embed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} KICK`, message.guild.iconURL)
    .addField("Akcja:", "kick")
    .addField("Moderator:", message.author.username)
    .addField("Powód:", reason)
    .addField("Data:", message.createdAt.toLocaleString())
    .setFooter("© DBIT-BOT | Kick")
    kickMember.send(embed).then(() => 
    message.mentions.members.first().kick()).catch(err => console.log(err))

    message.channel.send(`**${kickMember.user.tag}** został wyrzucony!`).then(m => m.delete(5000))


    let cembed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name}  Logi`, message.guild.iconURL)
    .addField("Akcja:", "kick")
    .addField("Użytkownik:", kickMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Powód:", reason)
    .addField("Data:", message.createdAt.toLocaleString())
    .setFooter("© DBIT-BOT | Logi")
    
        let sChannel = message.guild.channels.find(c => c.name === "logi")
        sChannel.send(cembed)

    }
}