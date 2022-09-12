const { MessageEmbed, MessageActionRow, MessageSelectMenu,MessageButton } = require("discord.js");
const axiosr = require('axiosr');
module.exports = {
    name:"eval",
    run(client, message, args){
        if(!message.author.id == "952940471368450068") return;
        try {
          var code = args.join(" ");
          var evaled = eval(code);
     
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          let Embed = new MessageEmbed()
                                .addField("Giriş","```js\n" + code + "```")
                                .setDescription("```js\n" + clean(evaled) + "```")
    if (Embed.description.length >= 2048)
          Embed.description = Embed.description.substr(0, 2042) + "```...";
        return message.channel.send({embeds:[Embed]})
        } catch (err) {
          message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
              // End of our command
            }
    }
