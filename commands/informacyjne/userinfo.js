const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
config: {
    name: "userinfo",
    description: "Wyświetla informacje na temat oznaczonego bota",
    usage: "<@użytkownik>",
    category: "informacyjne",
    accessableby: "Wszyscy, użytkownik",
    aliases: ["ui", "userinformation"]
        },
    run: (bot, message, args) => {
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new RichEmbed()
            .setTitle("**Userinfo**")
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('**Informacje użytkownika:**', stripIndents`- **Wyświetlana nazwa:** ${member.displayName}
            - **Dołączył:** ${joined}
            - **Lista roli:** ${roles}`, true)

            .addField('**Informacje użytkownika:**', stripIndents`- **id:** ${member.user.id}
            - **Nazwa Użytkownika**: ${member.user.username}
            - **Tag**: ${member.user.tag}
            - **Utworzył konto**: ${created}`, true)
            
            .setTimestamp()

        if (member.user.presence.game) 
            embed.addField('**Obecnie w grze:**', stripIndents`** Nazwa:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}