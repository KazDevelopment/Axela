const {Client, Collection, Intents, MessageEmbed, WebhookClient} = require("discord.js");
const webhook = new WebhookClient({url:"https://discord.com/api/webhooks/1016635823908728854/mw4N_nORo18v5Grey3xgBqYeVVdJSybP_1T7TT3_iXzs_s7X26y7MtCunVaiOtAupUPe"});
const Guild = require("./models/guild")
const fs = require("node:fs");
const { token,mongo } = require("./config");

/*
mongoose.connect(mongo, {}).then(() => {
    var Embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription("Database Online!")
    webhook.send({embeds:[Embed]})
}).catch(e => {
    var Embed = new MessageEmbed()
    .setColor("RED")
    .setDescription("Database Error")
    webhook.send({embeds:[Embed]});
    console.log("Database Error")
})*/

var client = new Client({
    intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials:["MESSAGE","CHANNEL","GUILD_MEMBER","USER"],
    allowedMentions:false,
    disableMentions:true,    
    debug:true
});
client.options.ws.properties.browser = "Discord Android";
client.options.ws.properties.os = "Discord Android";
client.options.ws.properties.device = "Discord Android";


client.once("ready", () => {
    
    var Embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription("Bot Online!")
    webhook.send({embeds:[Embed]})
    console.log("Bot Online!");
})

client.commands = new Collection();
for(const file of fs.readdirSync("commands").filter(file => file.endsWith(".js"))){
    const command = require("./commands/"+file);

    var embed = new MessageEmbed()
    .setDescription(`[Command Loaded] **${command.name}**`)

    
    webhook.send({
        content:null,
        embeds:[embed]
    });
    client.commands.set(command.name, command);
    //client.channels.cache.get("1015945102386012201").send({embeds:[embed]})
};

client.on("messageCreate", (message) => {
    var prefix = "ax"
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase();
    

    if(!client.commands.has(command)) return;

    try {
        client.commands.get(command).run(client, message, args)
    } catch(e){
        message.reply(`ERROR : \`${e}\``)
    }
    if(command == "test"){return message.channel.send("Test Successfully Worked")}

});

client.on("guildCreate", async (guild) => {

console.log(newGuild + " " + guild.id)
})

if(client.options.debug){
    client.on("debug", console.debug);
    client.on("warn", console.warn);
    client.on("error", console.error);
    client.on("apiRequest", console.log);
    client.on("apiResponse",console.log);
};
client.login(token)
