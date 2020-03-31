module.exports = {
    config: {
        name: "botoff",
        description: "wyłącza bota",
        usage: "",
        category: "owner",
        accessableby: "Właściciel bota.",
        aliases: ["botstop"]
    },
    run: async (bot, message, args) => {

    if(message.author.id != "414536807334805506") return message.channel.send("Nie jesteś właściciel bota!")

    try {
        await message.channel.send("Bot wyłącza się!")
        process.exit()
    } catch(e) {
        message.channel.send(`Błąd: ${e.message}`)
    }
    


    }
}