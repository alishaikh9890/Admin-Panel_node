const mongoose = require("mongoose");
require("dotenv").config();

let url = process.env.DB_URL;

const db = async() =>{
await mongoose.connect(
    url
);

console.log("connected to db")

}

module.exports  = db;
