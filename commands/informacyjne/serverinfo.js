const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "serverinfo",
        description: "Wyświetla informacje na temat serwera.",
        usage: " ",
        category: "informacyjne",
        accessableby: "Wszyscy, użytkownik",
        aliases: ["si", "serverinformation"]
    },
    run: async (bot, message, args) => {
    let sEmbed = new RichEmbed()
        .setColor(cyan)
        .setTitle("Informacje serwera")
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Nazwa serwera:**", `${message.guild.name}`, true)
        .addField("**Właściciel serwera:**", `${message.guild.owner}`, true)
        .addField("**Liczba osób na serwerze:**", `${message.guild.memberCount}`, true)
        .addField("**Liczba roli na serwerze:**", `${message.guild.roles.size}`, true)
        .setFooter(`© DBIT-BOT | Informacje serwera`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
    }
}