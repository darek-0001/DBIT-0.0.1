const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "removerole",
        description: "Zabiera rolę oznaczonemu użytkownikowi. Wysyła informacje na kanał #logi. Jeżeli nie potrzebujesz nie twórz kanału #logi.",
        usage: "<@użytkownik> <@rola> <powód>",
        category: "moderacyjne",
        accessableby: "Zarządzanie rolami, administrator",
        aliases: ["rr", "roleremove"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nie posiadasz uprawnień aby wykonać to polecenie!")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Proszę o podanie <@użytkownik>.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Proszę o podanie <@rola>") 
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("Proszę o podanie <powód>")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Nie posiadam upranień aby wykonać to polecenie! Potrzebuję: **Zarządzanie rolami, administrator**")

    if(!rMember.roles.has(role.id)) {
        return message.channel.send(`${rMember.displayName}, nie posiada takiej roli.`)
    } else {
        await rMember.removeRole(role.id).catch(e => console.log(e.message))
        message.channel.send(sembed)
    }
    let sembed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Removerole`, message.guild.iconURL)
    .addField("Akcja:", "Removerole")
    .addField("Użytkownik:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("powód:", reason)
    .addField("Data:", message.createdAt.toLocaleString())
    .setFooter("© DBIT-BOT | Removerole")

    let embed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Logi`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("Mutee:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    .setFooter("© DBIT-BOT | Logi")

        let sChannel = message.guild.channels.find(c => c.name === "logi")
        sChannel.send(embed)
    }   
}