const mongoose = require("mongoose");

const db = async() =>{
await mongoose.connect("mongodb+srv://rwbn1alishanas:adminpanel@cluster0.uradcvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

console.log("connected to db")

}

module.exports  = db;
