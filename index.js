
const path = require("path");

const express = require("express");
const router = require("./routes/route");
const db = require("./config/db");
const cookies = require("cookie-parser");
const session = require("express-session");
const passport = require("passport")
const LocalAuth = require("./middlewares/LocalAuth");
LocalAuth(passport);

const port = 9050;
  
const app = express();

app.use(passport.initialize());
app.use(passport.session())

app.use(cookies())

app.use(session({secret:"private-key"}));

app.use(express.urlencoded({extended:true}))

app.use(express.json())

app.use("/",router)

app.set("view engine", "ejs");

app.set("views",__dirname+"/view")

app.use(express.static(__dirname+"/public"))

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.listen(port, (err)=>{
    if(err){
       console.log("server is not connected");
        return false;
    } 
    db()
    console.log("server is running on port: "+port)
})