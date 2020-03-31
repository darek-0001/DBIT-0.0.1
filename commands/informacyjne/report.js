const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");

module.exports = { 
    config: {
        name: "report",
        category: "informacyjne",
        description: "Wysyła widaomość z treścią na kanał #reporty. Jeżeli nie potrzenujesz tego, nie twórz kanału #reporty",
        usage: "<@użytkownik> <powód>",
        accessableby: "Wszyscy, użytkownik",
    },
    run: async (bot, message, args) => {

        message.delete()
        // mentioned or grabbed user
        let target = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!target) return message.channel.send("Proszę o oznaczenie użytkownika!").then(m => m.delete(15000))

        // reasoning definition
        let reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send(`Proszę o podanie powodu dlaczego reportujsz**${target.user.tag}**`).then(m => m.delete(15000))

        // grab reports channel
        let sChannel = message.guild.channels.find(x => x.name === "reporty")

        // send to reports channel and add tick or cross

        message.channel.send("Twoje zgłoszenie zostało wysłane do administracji serwer! Dziękujemy za zgłoszenie.").then(m => m.delete(15000))
        let sEmbed = new RichEmbed()
        .setColor(cyan)
        .setTitle("**Report**")
        .setThumbnail(message.mentions.users.first().avatarURL)
        .addField("**Reportuje:**", `${message.author.tag}`, true)
        .addField("**Poszkodowany**", `${target.user.tag}`, true)
        .addField("**Powód**", `${reason}`)
        .setFooter(`© DBIT-BOT | Reports`, bot.user.displayAvatarURL)
        sChannel.send(sEmbed);
            //`**${message.author.tag}** has reported **${target.user.tag}** for **${reason}**.`).then(async msg => {
        }

  }
