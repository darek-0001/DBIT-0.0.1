const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "dog",
        description: "Wysyła losowe zdjęcie psa.",
        usage: "",
        category: "zabawa",
        accessableby: "Wszyscy, użytkownicy",
        aliases: ["doggo", "puppy"]
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generowanie...")

        fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply("WUPS. Nie udało się, spróbuj ponownie.")

            let embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} pies!`, message.guild.iconURL)
            .setImage(body.message)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
}