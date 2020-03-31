const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "unmute",
        description: "Odcisza oznaczonego użytkownika.",
        usage: "<@użytkownik> <powód>",
        category: "moderacyjne",
        accessableby: "Zarządzanie rolami, administrator",
        aliases: ["unm", "speak"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send("Nie posiadasz upranień aby wykonać to polecenie!**");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nie posiadam upranień aby wykonać to polecenie! Potrzebuję: **Zarządzanie rolami, administrator**")

//define the reason and unmutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Proszę o podanie <@użytkownik>");

let reason = args.slice(1).join(" ");
if(!reason) reason = "Nie podano powodu!"

//define mute role and if the mute role doesnt exist then send a message
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("Użytkownik nie jest wyciszony!")

//remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
mutee.removeRole(muterole.id).then(() => {
    message.delete()
    mutee.send(cembed).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} zosatł odciszony!`)
})
let cembed = new RichEmbed()
.setColor(redlight)
.setAuthor(`${message.guild.name} Unmute`, message.guild.iconURL)
.addField("Akcja:", "unmute")
.addField("Użytkownik:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Powód:", reason)
.addField("Data:", message.createdAt.toLocaleString())
.setFooter("© DBIT-BOT | Unmute")

//send an embed to the modlogs channel
let embed = new RichEmbed()
.setColor(redlight)
.setAuthor(`${message.guild.name} Logi`, message.guild.iconURL)
.addField("Akcja:", "unmute")
.addField("Użytkownik:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("powód:", reason)
.addField("Data:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "logi")
sChannel.send(embed)

    }
}