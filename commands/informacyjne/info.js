const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "info",
        description: "Informacja na temat pierwszych kroków w bocie.",
        usage: " ",
        category: "informacyjne",
        accessableby: "Wyrzucanie użytkowników, administrator",
        aliases: []
    },
    run: async (bot, message, args) => {
    let cembed = new RichEmbed()
    .setColor(cyan)
    .setTitle("Pierwsze ważne kroki:")
    .addField("**BARDZO WAŻNE INFORMACJE:**", "1. Aby dowiedzieć się jak używać komend użyj: __!pomoc (komenda)__\n2. Jeżeli znalazłeś jaki kolwiek błąd, pomyłkę lub przejęzyczenie proszę to zgłaszać do supportu!\n3. Proszę o nie przeciążanie bota. Grozi to odebraniem uprawnień bota.\n", true)
    .addField("**BARDZO WAŻNE CZYNNOŚĆI:**", "sss", true)
    .setDescription("Pamiętaj że w DBIT-BOT nie ma narazie możliwości zminy prefixu! Prefix: **!**")

    message.author.send(cembed)
    }
}