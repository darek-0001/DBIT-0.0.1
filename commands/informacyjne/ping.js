module.exports = { 
    config: {
        name: "ping",
        description: "Wyświetla aktualny ping bota.",
        usage: " ",
        category: "informacyjne",
        accessableby: "Wszyscy, użytkownik"
    },
    run: async (bot, message, args) => {

    message.channel.send("Pingowanie...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["Czy to naprawdę mój ping", "Czy to w porządku? Nie mogę spojrzeć", "Mam nadzieję, że nie jest źle"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}: Opóźnienie bota: \`${ping} ms\`, Opóźnienie interfejsu API: \`${Math.round(bot.ping)}\``)
    })
  }
}