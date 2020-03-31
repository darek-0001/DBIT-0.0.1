const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "say",
        description: "Wysyła wiadomość w embed na kanale.",
        usage: "<wiadomość>",
        category: "moderacyjne",
        accessableby: "Staff",
        aliases: ["acc", "announcement", "ogłoszenie"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("Nie posiadasz uprawnień aby wykonać to polecenie!")
    
    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        mChannel.send(argsresult)
    } else {
        argsresult = args.join(" ")
        let dEmbed = new RichEmbed()
        .setColor(cyan)
        .setTitle(`**${argsresult}**`)
        .setThumbnail(message.mentions.channels.first().iconURL)
        .setFooter(`© DBIT-BOT | Say`, bot.user.displayAvatarURL)
        .setTimestamp()
        message.channel.send(dEmbed)
    }

    }
}