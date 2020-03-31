const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "support",
        description: "Informacja na temat supportu.",
        usage: " ",
        category: "informacyjne",
        accessableby: "Wszyscy, użytkownik",
        aliases: ["błąd", "blad"]
    },
    run: async (bot, message, args) => {
    let cembed = new RichEmbed()
    .setTitle("Support info:")
    .setDescription("__PAMIĘTAJ:__ Support DBIT-BOT dopiero się powiększa, więc czas oczekiwania na odpowiedź jest dłuższy!")
    .addField("**Właściciel DBIT-BOT:**", "DareQ_#4735", true)
    .addField("**Zaproszenie na serwer __DBIT-BOT SUPPORT:__**", "https://discord.gg/SmH8GFv", true)
    .setFooter("© DBIT-BOT | Support")
    message.author.send(cembed)
}
}