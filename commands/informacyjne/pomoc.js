const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "pomoc",
        aliases: ["p", "help", "commands", "komendy"],
        usage: "(command)",
        category: "informacyjne",
        description: "Wyświetla wszytskie komendy które posiada bot.",
        accessableby: "Wszyscy, użytkownicy"
    },
    run: async (bot, message, args) => {
        const embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`DBIT-BOT Pomoc`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`Informacje o komendach znajdziesz pod **${prefix}pomoc (komenda)**\nParametry: <> - obowiązkowy, () - opcjonalny`)
            embed.setFooter(`© DBIT-BOT | Wszystkie komendy: ${bot.commands.size}`, bot.user.displayAvatarURL);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                embed.addField(`» ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\`,`).join(" "))
                } catch(e) {
                    console.log(e)
                }
            })

            return message.channel.send(embed)
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Nie prawidłowa komenda.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
            command = command.config

            embed.setDescription(stripIndents`Prefix bota: \`${prefix}\`\n
            **Komenda:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Opis:** ${command.description || "Brak opisu."}
            **Użycie:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "Brak użycia"}
            **Uprawnienia:** ${command.accessableby || "Wszyscy, użytkownicy"}
            **Aliasy:** ${command.aliases ? command.aliases.join(", ") : "Nie ma."}`)

            return message.channel.send(embed)
        }
    }
}
