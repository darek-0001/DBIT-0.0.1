const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { cyan } = require("../../colours.json");

const fetch = require("node-fetch");

module.exports = { 
    config: {
        name: "instagram",
        aliases: ["insta", "ig"],
        description: "Wysyła informacje na temat danej osoby",
        usage: "<nazwa użytkownika>",
        category: "informacyjne",
        accessableby: "Wszyscy, użytkownik",
    },
    run: async (client, message, args) => {
        const name = args.join(" ");

        if (!name) {
            return message.channel.send("Zapomniałeś dodać <nazwa użytkownika>")
                .then(m => m.delete(5000));
        }

        const url = `https://instagram.com/${name}/?__a=1`;
        
        let res; 

        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.channel.send("Hmmm, przepraszam ale nie znalazłem takiego użytkownika. Sprawdz dokładną nazwę i użyj komendy ponownie.")
                .then(m => m.delete(5000));
        }

        const account = res.graphql.user;

        const embed = new RichEmbed()
            .setColor(cyan)
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Informacje o profilu", stripIndents`**- Nazwa użytkownika:** ${account.username}
            **- Imię i nazwisko:** ${account.full_name}
            **- Biografia:** ${account.biography.length == 0 ? "nie ustawiona" : account.biography}
            **- Liczba postów:** ${account.edge_owner_to_timeline_media.count}
            **- Obserwujący:** ${account.edge_followed_by.count}
            **- Obserwuje:** ${account.edge_follow.count}
            **- Prywatne konto:** ${account.is_private ? "Tak 🔐" : "Nie 🔓"}`);

        message.channel.send(embed);
    }
}