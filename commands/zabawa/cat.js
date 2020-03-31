const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "cat",
        description: "Wysyła losowe zdjęcie kota.",
        usage: "",
        category: "zabawa",
        accessableby: "Wszyscy, użytkownicy",
        aliases: ["cats"]
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generowanie...")

        fetch("http://aws.random.cat/meow")
        .then(res => res.json()).then(body => {
            if(!body) return message.reply("WUPS. Nie udało się, spróbuj ponownie.")

            let embed = new RichEmbed()
            .setColor(cyan)
            .setAuthor(`${bot.user.username} kot!`, message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

                msg.edit(embed)
        })
    }
}