const mongoose = require("mongoose");

let adminSchema = new mongoose.Schema({
    username : String,
    email : String,
    phone : Number,
    pic : String,
    password : String,

});


const admin =  mongoose.model("adminpanel", adminSchema)

module.exports = admin;