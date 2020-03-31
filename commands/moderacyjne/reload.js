module.exports = {
    config: {
        name: "reload",
        description: "Przeładowywuje podaną komendę.",
        usage: "<komenda>",
        category: "owner",
        accessableby: "Właściciel bota",
        aliases: ["dreload"]
    },
    run: async (bot, message, args) => {

    if(message.author.id != "414536807334805506") return message.channel.send("Nie jesteś właścicielem bota!")

    if(!args[0]) return message.channel.send("Proszę o podanie <komenda>")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Nie mogę przeładować: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`Komenda \`${args[0].toUpperCase()}\` została przeładowana!`)

    }
}