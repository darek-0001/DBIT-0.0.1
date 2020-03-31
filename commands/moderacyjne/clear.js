const { RichEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "clear",
        description: "Usuwa podaną liczbę wiadomości.",
        usage: "<ilość>",
        category: "moderacyjne",
        accessableby: "Zarządzanie wiadomościami, administrator",
        aliases: ["cc", "deletemessage"]
    },
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR")) {
            return message.channel.send("Nie posiadasz uprawnień aby wykonać to polecenie!").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("Proszę o podanie <ilość>").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR")) {
            return message.channel.send("Nie posiadam upranień aby wykonać to polecenie! Potrzebuję: **Zarządzanie wiadomościami, administrator**").then(m => m.delete(15000));
        }
        
        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`Usunąłem \`${deleted.size}\` wiadomości.`)).then(m => m.delete(15000))
            .catch(err => message.reply(`Wystompił bład: ${err}`));
    }
}