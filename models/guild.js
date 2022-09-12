var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var guildSchema = new Schema({
    guildId:{
        type:Number,
        required:true
    }
})

var guild = mongoose.model("guilds", guildSchema)

module.exports = guild;