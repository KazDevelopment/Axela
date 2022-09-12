const { MessageButton, Collector } = require("discord.js");

module.exports = {
    name:"disconnect",
    async run(client, message, args){
        if(message.author.id !== "952940471368450068") return;
        const btna = new MessageButton()
        .setStyle("DANGER")
        .setLabel("Accept")
        .setCustomId("acp")
        const btnd = new MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Decline")
        .setCustomId("decline");

        const filter1 = i => i.customId === "acp" || i.user.id === message.author.id;

        const collector = message.channel.createMessageCollector({filter1});

        collector.on("collect", async(i) => {
            setTimeout(function(){
                client.destroy()
                //process.exit(1);
            }, 3000)
        })

        const filter2 = i => i.customId === "decline" 

        const collector2 = message.channel.createMessageCollector({filter2});

        collector2.on("collect", async(i) => {
            i.reply({content:"Canceled Process"})
        })

       await message.channel.send({content:"Disconnect", components:[btna,btnd]})

    }
}