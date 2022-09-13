const { MessageButton, Collector,MessageActionRow } = require("discord.js");

module.exports = {
    name:"disconnect",
    async run(client, message, args){
        if(message.author.id !== "952940471368450068") return;
        const btnaccept = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("DANGER")
            .setLabel("Accept")
            .setCustomId("acp")
        )
        const btndecline = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("SUCCESS")
            .setLabel("Decline")
            .setCustomId("decline")
        )


        let iFilter = i => i.user.id === "952940471368450068";
        let collector = message.createMessageComponentCollector({ filter: iFilter, time: 3600000 })
        
        collector.on("collect", async(i) => {
            if(i.customId === "acp"){
                i.reply("bb :(").then(setTimeout(function(){
                    process.exit(0);
                },3000))
            
            } else if (i.customId === "decline"){
                i.reply("İptal Edildi.")
            }
        })
       await message.channel.send({content:"Disconnect", components:[btnaccept, btndecline]})

    }
}