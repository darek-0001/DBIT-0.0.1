const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "unban",
        description: "Odbanowywuje oznaczonego użytkownika",
        usage: "<id> <unban>",
        category: "moderacyjne",
        accessableby: "Banowanie użytkowników, administrator",
        aliases: ["ub", "unbanish"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie posiadasz uprawnień aby wykonać to polecenie!")

		
	if(isNaN(args[0])) return message.channel.send("Proszę o podanie <id>")
    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send("Proszę o podanie id użytkownika aby go odbanować!")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "Nie nadano powodu!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Nie posiadam upranień aby wykonać to polecenie! Potrzebuję: **Banowanie członków, administrator**")|
    message.delete()
    try {
        message.guild.unban(bannedMember, reason)
        message.channel.send(`${bannedMember.tag} został odbanowany na serwerze.`)
    } catch(e) {
        console.log(e.message)
    }

    let embed = new RichEmbed()
    .setColor(redlight)
    .setAuthor(`${message.guild.name} Logi`, message.guild.iconURL)
    .addField("Akcja:", "unban")
    .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "logi")
        sChannel.send(embed)

    }
}
