const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
   username : String,
   email : String,
   phone : Number,
   password : String
})

const user = mongoose.model("userPanel", userSchema);

module.exports = user