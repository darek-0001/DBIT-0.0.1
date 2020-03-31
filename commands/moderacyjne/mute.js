const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "mute",
        description: "Wycisza użytkownika na serwerze. Wysyła informacje na kanał #logi. Jeżeli nie potrzebujesz nie twórz kanału #logi.",
        usage: "<@użytkownik> <powód>",
        category: "moderacyjne",
        accessableby: "Zarządanie rolami",
        aliases: ["m", "nospeak"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("Nie posiadasz uprawnień aby wykonać to polecenie!");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nie posiadam upranień aby wykonać to polecenie! Potrzebuję: **Zarządzanie rolami, administrator**")

//define the reason and mutee
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send("Proszę o podanie <@użytkownik> <powód>");

let reason = args.slice(1).join(" ");
if(!reason) reason = "Nie podano powodu!"

//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "Muted",
            color: "#514f48",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(sembed).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} Został wyciszony!`)
})

let sembed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Mute`, message.guild.iconURL)
    .addField("Akcja:", "mute")
    .addField("Użytkownik:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Powód:", reason)
    .addField("Data:", message.createdAt.toLocaleString())
    .setFooter("© DBIT-BOT | Mute")
//send an embed to the modlogs channel
let embed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Logi`, message.guild.iconURL)
    .addField("Akcja:", "mute")
    .addField("Użytkowownik:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Powód:", reason)
    .addField("Data:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "logi")
sChannel.send(embed)
    }
}