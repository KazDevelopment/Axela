module.exports= {
name:"replyme",
    run(client, message, args){
        message.reply(message.content).then((result) => {
            setTimeout(function(){
                result.delete()
            },7000)
        })
    }
}