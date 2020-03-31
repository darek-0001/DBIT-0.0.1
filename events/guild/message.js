const { prefix } = require("../../botconfig.json");

module.exports = async (bot, message) => { 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
        
    if (cmd.length === 0) return;
    let command = bot.commands.get(cmd);
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (command) 
        command.run(bot, message, args);
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) { 
        commandfile.run(bot, message, args) 
    } 
    else if (message.content.startsWith(prefix)) {
        message.react('❌');
}
}